myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/UserProfile/:Email?', {
            templateUrl:'Views/UserProfile/UserProfile.html',
            controller:'userProfileController'
        });
});
myAngularModule.controller('userProfileController', function ($scope, $routeParams, userService) {
    $('.collapsible').collapsible();
    $scope.uemail = $routeParams.Email;
    userService.getUserByEmail($scope.uemail).then(function (result) {
        $scope.usr = result;
        $scope.usr.Pass = "";
    });
    $scope.ChangePassword = function (Usr, IsValid) {
        if(IsValid){
            userService.changePassword(Usr).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Edycja zakończona pomyślnie.";
                    Materialize.toast($scope.Msg,5000);

                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            })
        }
    }
});