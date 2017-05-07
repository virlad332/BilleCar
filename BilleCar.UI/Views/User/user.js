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
    $scope.ChangeRole = function (Usr) {
        userService.changeRole(Usr).then(function (result) {
            if (result.ModelState == null){
                $scope.Msg = "Zmieniono uprawnienia";
                Materialize.toast($scope.Msg,4000);
                userService.getAll().then(function (result) {
                    $scope.usrs = result;
                });
            }
            else{
                $scope.serverErrorMsgs = result.ModelState;
            }
        });
    };
});