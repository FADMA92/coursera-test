(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service ('MenuSearchService', MenuSearchService)
  .constant ('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive ('foundItems', FoundItems);

  function FoundItems () {
    var ddo = {
      restrict : 'E',
      templateUrl : 'foundItems.html',
      scope : {
        foundItems: '<',
        onRemove: '&',
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isempty = function () {
      if (list.foundItems.length === 0 && list.foundItems !== 'undefined') {
        return true;
      }
      return false;
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService){
    var list = this;
    list.searchTerm = '';

    list.narrowit = function (searchTerm){
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function(items){
        if ( items.length > 0 && items) {
          list.message = '';
          list.found = items;
        }
        else {
          list.message = 'Nothing found';
          list.found = [];
        }
      });
    };

    list.removeMenuItem = function (itemIndex){
      list.found.splice(itemIndex, 1);
    }

  }


  MenuSearchService.$inject = ['$http','ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method:"GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(result) {
        var foundItems = [];

        for (var i = 0; i < result.data['menu_items'].length; i++){
          if (searchTerm.length > 0 && result.data['menu_items'][i]['description'].toLowerCase().indexOf(searchTerm)!== -1){
            foundItems.push(result.data['menu_items'][i]);
          }
        }
        return foundItems;
      });
    };
  }

})();
