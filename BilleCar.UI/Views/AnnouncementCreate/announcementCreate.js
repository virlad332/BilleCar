myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when("/announcementCreate", {
            templateUrl: "Views/AnnouncementCreate/AnnouncementCreate.html",
            controller: 'announcementCreateController'
        });
});


myAngularModule.controller('announcementCreateController', function ($scope, registerService, announcementService, utilityService, userService, $rootScope, $cookies, $location, $timeout) {
    
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
                    $scope.Msg = "Utworzyłes ogłoszenie, za 5 sekund zostaniesz przekierowany do listy ogloszeń." ;
                    $scope.Flg = true;
                    Materialize.toast($scope.Msg,5000);
                    $timeout(function () {
                        $location.path('/announcement');
                    }, 5000);
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        };
    };
});