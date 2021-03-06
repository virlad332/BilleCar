﻿myAngularModule.config(function ($routeProvider) {
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
    annObj.getUserAnnouncementCount = function (uemail) {
        var Anns;

        Anns = $http({method:'Get', url:'http://localhost:50615/api/Announcement', params:{email: uemail}}).
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
    depObj.CreateDepartment = function (dep) {
        var Dep;

        Dep = $http({method:'Post', url:'http://localhost:50615/api/Department/', data: dep}).
        then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Dep;
    };
    return depObj;
});

myAngularModule.controller('announcementController', function ($scope,  departmentService, announcementService, NgMap, waypointService) {

    $scope.msg = "Witaj mordo";

   /* $scope.getWays = function (Aid) {
        if(typeof Aid == "undefined"){

        }
        else{
            waypointService.getWaypointByAnnouncementId(Aid).then(function (result) {
                    var x = parseFloat(result[0].Lat);
                    var y = parseFloat(result[0].Lng);
                    $scope.ways =[
                        {location: {lat:x, lng:y}, stopover: true}
                    ];

            });
        }
    };*/
   $scope.ways = [];


    announcementService.getAll().then(function (result) {
        $scope.anns = result;
        angular.forEach($scope.anns, function (value, key) {
            $scope.anns[key].ways = [];
            var x = moment($scope.anns[key].StartDate);
            $scope.anns[key].Date = x.format('DD-MMMM-YYYY');
            $scope.anns[key].Time = x.format('HH:mm');
            $scope.anns[key].StartDate = x.format('DD-MMM-YYYY HH:mm');
            waypointService.getWaypointByAnnouncementId($scope.anns[key].AnnouncementId).then(function (result) {
                    if(result.length !==0){
                    var x = parseFloat(result[0].Lat);
                    var y = parseFloat(result[0].Lng);
                    $scope.anns[key].ways =[
                        {location: {lat:x, lng:y}, stopover: true}
                    ];}
            });
        })
    });
    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AscOrDesc = !$scope.AscOrDesc;
    };

    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });

});
