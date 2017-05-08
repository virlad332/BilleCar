myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/announcementUpdate/:AnnouncementId?', {
            templateUrl: 'Views/AnnouncementUpdate/AnnouncementUpdate.html',
            controller: 'announcementsUpdateController'

        });
});
myAngularModule.controller('announcementsUpdateController', function ($scope, $routeParams, announcementDetailService, utilityService, registerService) {

    $scope.aid = $routeParams.AnnouncementId;
    announcementDetailService.GetByID($scope.aid).then(function (result) {
        $scope.Ann = result;

    });
    registerService.getAll().then(function (result) {
        $scope.deps = result;
        $('select').material_select();

    });
    $scope.sprawdzenie = function (test) {
        $('select').material_select();
    };
    $scope.UpdateAnnouncement = function (Ann, IsValid) {
        
        if(IsValid){
            announcementDetailService.updateAnnouncement(Ann).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Edycja zakończona pomyślnie";
                    $scope.Flg = true;
                    Materialize.toast($scope.Msg, 4000);
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };
});

