/**
 * Created by Zduno on 2017-05-05.
 */
myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/user',{
            templateUrl: 'Views/User/User.html',
            controller: 'userController'
        });
});
myAngularModule.controller('userController', function ($scope, userService) {
    userService.getAll().then(function (result) {
        $scope.usrs = result;
    });
});