'use strict';

var app = angular.module('flexgetApp', ['ui.router', 'ngMaterial']);

function getRoutes() {
  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');

  return $http.get('/ui/routes').then(function(response) {
    app.constant('appRoutes', response.data);
  }, function(errorResponse) {
    // Handle error case
  });
}

function bootstrapApplication() {
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['flexgetApp']);
  });
}

app.config(function(appRoutes, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
  $mdIconProvider.fontSet('fa', 'fa');
  $mdThemingProvider.theme('default')
    .primaryPalette('orange');

  $urlRouterProvider.otherwise('/home');
  var currentRoute;
  var j = 0;

  for ( ; j < appRoutes.routes.length; j++ ) {
    currentRoute = appRoutes.routes[j];
    $stateProvider.state(currentRoute.name, {
      url: currentRoute.url,
      templateUrl: currentRoute.template_url,
      controller: currentRoute.controller
    });
  }
});

getRoutes().then(bootstrapApplication);