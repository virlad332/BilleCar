/**
 * Created by Zduno on 2017-05-10.
 */
myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/userMyAnnouncement/:Email?',{
            templateUrl:'Views/UserMyAnnouncement/UserMyAnnouncement.html',
            controller:'userMyAnnouncementController'
        });
});
myAngularModule.factory('userMyAnnouncementService', function ($http) {
    usrMyAnnObj = {};
    usrMyAnnObj.getAnnByEmail = function (uemail) {
        var ann;
        ann= $http({method:'Get', url:'http://localhost:50615/api/UserMyAnnouncement', params:{email:uemail}}).
            then(function (response) {
            return response.data;
        });
        return ann;
    };
    return usrMyAnnObj;
});
myAngularModule.controller('userMyAnnouncementController', function ($scope, $routeParams, userService,userMyAnnouncementService) {
    $scope.uemail = $routeParams.Email;
    userService.getUserByEmail($scope.uemail).then(function (result) {
        $scope.usr = result;
    });

    userMyAnnouncementService.getAnnByEmail($scope.uemail).then(function (result) {
        $scope.anns = result;
    });

});


