myAngularModule.config(function ($routeProvider) {
    $routeProvider        
        .when("/login", {
            templateUrl: "Views/Login/Login.html",
            controller: "loginController"
        });
});
myAngularModule.factory('loginService', function ($http) {
    loginObj = {};

    loginObj.getByUsr = function (user) {
        var Usr;
        Usr = $http({
            method: 'POST', url: 'http://localhost:50615/api/Login', data: user}).
        then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Usr;
    };
    return loginObj;
});
myAngularModule.controller('loginController', function ($scope, loginService, $cookies, $rootScope, $location ) {
    $scope.re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    $scope.emailRegEx = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.Login = function (usr, IsValid) {
        if (IsValid) {
            loginService.getByUsr(usr).then(function (result) {
                if (result.ModelState == null) {

                    $scope.Usr = result;
                    $scope.errorMsgs = "";
                    $cookies.put("Auth", "true");
                    $rootScope.Auth = $cookies.get("Auth");
                    $cookies.put("UsrSignIn", JSON.stringify($scope.Usr));
                    $rootScope.UsrSignIn = JSON.parse($cookies.get("UsrSignIn"));
                    $location.path('/home');
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    }
});

