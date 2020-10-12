(function ()  {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuylist = this;

  tobuylist.items = ShoppingListCheckOffService.gettobuyitems();

  tobuylist.changeSideItem = function (itemIndex) {
    ShoppingListCheckOffService.changeSideItem(itemIndex);
  };
}


AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtlist = this;

  boughtlist.items = ShoppingListCheckOffService.boughtitems();

}

function ShoppingListCheckOffService() {
  var service = this;

  //List of shopping items

  var tobuyitems =[{
    name:"cookies",
    quantity : "10"
  },
  { name: "beers",
    quantity : "5"
  },
  { name: "pizzas",
    quantity : "3"
  },
  { name: "Waters",
    quantity : "6"
  },
  { name: "chocolats",
    quantity : "4"
  }];


  var boughtitems = [];

  service.gettobuyitems = function () {
    return tobuyitems;
  };

  service.boughtitems = function () {
    return boughtitems;
  };

  service.changeSideItem = function (itemIndex) {
    boughtitems.push(tobuyitems[itemIndex]);
    tobuyitems.splice(itemIndex,1);
  };

}


})();
