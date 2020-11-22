(function () {
  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/');

  MenuDataService.$inject = ['$http','ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function () {
      var promise = $http({
        method: 'GET',
        url : (ApiBasePath + 'categories.json'),
        }).then(
        function (response){
          var data = response.data;
          return data;
        });

        return promise;
      }

    service.getItemsForCategory = function (categoryShortName){
      var promise = $http({
        method: 'GET',
        url: (ApiBasePath + 'menu_items.json?category=' + categoryShortName),
      }).then(function(response){
        var data = response.data
        return data;
      });

       return promise;

    }

    }

})();
