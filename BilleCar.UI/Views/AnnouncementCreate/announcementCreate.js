myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when("/announcementCreate", {
            templateUrl: "Views/AnnouncementCreate/AnnouncementCreate.html",
            controller: 'announcementCreateController'
        });
});


myAngularModule.controller('announcementCreateController', function ($scope, registerService, announcementService, utilityService, userService, $rootScope, $cookies, $location, $timeout, NgMap) {
    
    registerService.getAll().then(function (result) {
        $scope.deps = result;
        $('select').material_select();
    });
    $scope.CreateAnnouncement = function (Ann, IsValid) {
        $rootScope.UsrSignIn = JSON.parse($cookies.get("UsrSignIn"));
        Ann.AutorRefUser = $rootScope.UsrSignIn.Email;
        if(IsValid){
            announcementService.createAnnouncement(Ann).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Utworzyłes ogłoszenie." ;
                    $scope.Flg = true;
                    Materialize.toast($scope.Msg,5000);
                        $location.path('/announcement');
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };

});