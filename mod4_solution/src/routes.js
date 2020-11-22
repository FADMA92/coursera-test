(function () {
  'use strict';
  angular.module('MenuApp').config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider


    //Home page
    .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/routes.home.template.html'
    })

    //categories page

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/templates/routes.categories.template.html',
      controller: 'CategoriesController as categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    //items page

    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/menuapp/templates/routes.items.template.html',
      controller: 'ItemsController as itemsCtrl',
      resolve: {
        data: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
          .then(function (items){
            return items;
          });
        }],
            }
      });
  }
})();
