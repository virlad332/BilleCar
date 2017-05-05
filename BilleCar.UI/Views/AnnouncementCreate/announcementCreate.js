myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when("/announcementCreate", {
            templateUrl: "Views/AnnouncementCreate/AnnouncementCreate.html",
            controller: 'announcementCreateController'
        });
});


myAngularModule.controller('announcementCreateController', function ($scope, registerService, announcementService, utilityService, userService, $rootScope, $cookies) {
    
    registerService.getAll().then(function (result) {
        $scope.deps = result;
    });
    $scope.CreateUser = function (Usr, IsValid) {
        if (IsValid) {
            userService.createUser(Usr).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "Utworzyles konto " + result.Email;
                    $scope.Flg = true;

                    utilityService.myAlert();
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        };
    };
    $scope.CreateAnnouncement = function (Ann, IsValid) {
        $rootScope.UsrSignIn = JSON.parse($cookies.get("UsrSignIn"));
        Ann.AutorRefUser = $rootScope.UsrSignIn.Email;
        if(IsValid){
            announcementService.createAnnouncement(Ann).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Utworzyłes ogłoszenie";
                    $scope.Flg = true;
                    utilityService.myAlert();
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        };
    };
    $scope.DeleteAnnouncementById = function (Ann) {
        
            announcementService.deleteAnnouncementById(Ann.AnnouncementId).then(function (result) {
                if (result.ModelState == null){
                    $scope.Msg = "Usunąles ogloszenie"+ result.AnnouncementId;
                    $scope.Flg = true;
                    utilityService.myAlert();


                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        
    };

});