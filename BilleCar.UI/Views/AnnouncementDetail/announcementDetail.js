myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/announcementDetail/:AnnouncementId?', {
            templateUrl: 'Views/AnnouncementDetail/AnnouncementDetail.html',
            controller: 'announcementDetailController'
        });
});

myAngularModule.factory('announcementDetailService', function ($http) {
    annUpdateOjb = {};

    annUpdateOjb.GetByID = function (aid) {
        var anns;

        anns = $http({ method: 'Get', url: 'http://localhost:50615/api/Announcement', params: { id: aid } }).
            then(function (response) {
                return response.data;
            });

        return anns;
    };
    annUpdateOjb.updateAnnouncement = function (ann) {
        var selectedValue = $('#select').val();
        var intSelectedValue = selectedValue.match(/\d+$/)[0];
        ann.DepartmentRefId = intSelectedValue;
        var Ann;
        Ann = $http({ method: 'Put', url: 'http://localhost:50615/api/Announcement', data: ann }).
            then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Ann;
    };

    return annUpdateOjb;
});

myAngularModule.factory('userByEmailService', function ($http) {
    usrUpdateObj = {};

    usrUpdateObj.GetByEmail = function (uemail) {
        var usrs;

        usrs = $http({ method: 'Get', url: 'http://localhost:50615/api/User', params: { email: uemail } }).
            then(function (response) {
            return response.data;
        });
        return usrs;
    };
    return usrUpdateObj;
});

myAngularModule.factory('departmentByIdService',function ($http) {
    depUpdateObj = {};

    depUpdateObj.GetDepById = function (did) {
        var deps;

        deps = $http({ method: 'Get', url: 'http://localhost:50615/api/Department', params: { id: did } }).
            then(function (response) {
            return response.data;
        });
        return deps;
    };
    return depUpdateObj;
});



myAngularModule.controller('announcementDetailController', function ($scope, $routeParams, announcementDetailService, userByEmailService, departmentByIdService, announcementService, utilityService, $window) {
    $scope.msg = "Witaj mordo na details";

    $scope.aid = $routeParams.AnnouncementId;
    announcementDetailService.GetByID($scope.aid).then(function (result) {
        $scope.anns = result;
        $scope.uemail = result.AutorRefUser;
        $scope.did = result.DepartmentRefId;
        departmentByIdService.GetDepById($scope.did).then(function (result) {
            $scope.deps = result;
        });
        //$scope.anns.AddDate = new Date($scope.anns.AddDate);
        userByEmailService.GetByEmail($scope.uemail).then(function (result) {
            $scope.usrs = result;
        });
    });
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
