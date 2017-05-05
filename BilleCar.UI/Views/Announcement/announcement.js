myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/announcement', {
            templateUrl: 'Views/Announcement/Announcement.html',
            controller: 'announcementController'
        });
});



myAngularModule.factory('announcementService', function ($http) {
    annObj = {};
    annObj.getAll = function () {
        var anns;
        anns = $http({ method: 'Get', url: 'http://localhost:50615/api/Announcement' }).
            then(function (response) {
                return response.data;
            });
        return anns;
    };
    annObj.createAnnouncement = function (ann) {
        var Ann;

        Ann = $http({ method: 'Post', url: 'http://localhost:50615/api/Announcement', data: ann }).
            then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Ann;
    };
    annObj.deleteAnnouncementById = function (eid) {
        var Anns;

        Anns = $http({ method: 'Delete', url: 'http://localhost:50615/api/Announcement', params: { id: eid } }).
            then(function (response) {
            return response.data;
        });
        return Anns;
    };
    return annObj;
});

myAngularModule.factory('departmentService', function ($http) {
    depObj = {};
    depObj.getAll = function () {
        var deps;
        deps = $http({ method: 'Get', url: 'http://localhost:50615/api/Department' }).
            then(function (response) {
                return response.data;
            });
        return deps;
    };
    return depObj;
});

myAngularModule.controller('announcementController', function ($scope,  departmentService, announcementService, utilityService) {
    $scope.msg = "Witaj mordo";

    announcementService.getAll().then(function (result) {
        $scope.anns = result;
    });


    departmentService.getAll().then(function (result) {
        $scope.deps = result;
    });

    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AscOrDesc = !$scope.AscOrDesc;
    };
    $scope.DeleteAnnouncementById = function (Ann) {
        if($window.confirm("Chcesz usunac ogloszenie nr:"+Ann.AnnouncementId+" ?")){
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
        }
    };

});
