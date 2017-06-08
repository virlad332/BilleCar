// declare a module
var myAngularModule = angular.module('app', ['ngRoute', 'ngCookies','ngMap','angularUtils.directives.dirPagination']);

myAngularModule.run(function ($rootScope, $cookies, $http) {
    moment.locale('pl');
    if ($cookies.get("Auth") == null) {
        $cookies.put("Auth", "false");
    }
    $rootScope.Auth = $cookies.get("Auth");
});

myAngularModule.config(function($routeProvider) {
    $routeProvider


        .when("/notatki", {
            templateUrl: "notatki.html"
        });
    $routeProvider
        .when("/index", {
            templateUrl: "index.html",
            controller:'myAngularController'
        });

    $routeProvider
    .when('/logout', {
        resolve: {
            auth: function ($rootScope, $location, $cookies) {

                $cookies.put("Auth", "false");
                $rootScope.Auth = $cookies.get("Auth");

                $cookies.put("UsrSignIn", null);
                $rootScope.UsrSignIn = $cookies.get("UsrSignIn");

                $location.path('/starter');
            }
        }
    });
        

});
myAngularModule.factory("utilityService", function () {
    utilityObj = {};

    utilityObj.myAlert = function () {
        $("#alert").fadeTo(2000, 500).slideUp(1000, function () {
            $("#alert").slideUp(1000);
        });
    };
    return utilityObj;
});

myAngularModule.controller('myAngularModuleController', function ($scope, $rootScope, $location, $cookies) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        var Guest = ['/register', '/login'];
        var User = ['/home', '/logout', '/announcement', '/announcementDetail/:AnnouncementId?','/user','/DepartmentUpdate/:DepartmentId?',
            '/announcementUpdate/:AnnouncementId?','/announcementCreate','/UserProfile/:Email?','/userMyAnnouncement/:Email?'];
        var Admin = ['/home', '/logout', '/oddzialy', '/announcement', '/announcementDetail/:AnnouncementId?','/announcementCreate',
            '/announcementUpdate/:AnnouncementId?','/user','/DepartmentUpdate/:DepartmentId?','/departmentCreate','/UserProfile/:Email?',
            '/userMyAnnouncement/:Email?'];

        if ($rootScope.Auth == 'false' && $.inArray(next.$$route.originalPath, Guest) == -1) {
            $location.path('/starter');
        }
        else {
            $rootScope.UsrSignIn = JSON.parse($cookies.get("UsrSignIn"));
            role = $rootScope.UsrSignIn.Role;

            if (role == 'admin' && $.inArray(next.$$route.originalPath, Admin) == -1) {
                $location.path('/home');
            }
            else if(role == 'user' && $.inArray(next.$$route.originalPath, User) == -1){
                $location.path('/home');
            }
        }
    });
    $location.path('/starter');

});


