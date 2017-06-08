/**
 * Created by Zduno on 2017-06-08.
 */
myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when("/starter", {
            templateUrl: "Views/Starter/Starter.html",
            controller:'starterController'
        });
});
myAngularModule.controller('starterController', function ($scope) {

});