myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/announcementUpdate/:AnnouncementId?', {
            templateUrl: 'Views/AnnouncementUpdate/AnnouncementUpdate.html',
            controller: 'announcementsUpdateController'

        });
});
myAngularModule.controller('announcementsUpdateController', function ($scope, $routeParams, announcementDetailService, utilityService, registerService, $timeout, $location, NgMap) {

    $scope.aid = $routeParams.AnnouncementId;
    announcementDetailService.GetByID($scope.aid).then(function (result) {
        $scope.Ann = result;
    });
    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });
    registerService.getAll().then(function (result) {
        $scope.deps = result;
        $('select').material_select();
    });
    $scope.UpdateAnnouncement = function (Ann, IsValid) {
        if(IsValid){
            announcementDetailService.updateAnnouncement(Ann).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Edycja zakończona pomyślnie.";
                    Materialize.toast($scope.Msg,5000);
                    var path = Ann.AnnouncementId;
                    $location.path('/announcementDetail/'+path);
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };

});

