﻿myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when("/announcementCreate", {
            templateUrl: "Views/AnnouncementCreate/AnnouncementCreate.html",
            controller: 'announcementCreateController'
        });
});

myAngularModule.factory('waypointService', function ($http) {
    waypointUpdateObj = {};
    waypointUpdateObj.decode = function (adress) {
        var way;
        way=$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
            adress + '&key=AIzaSyAm3paLs5nRPBcwOe8uzKNX-MnQ18v7E8c')
        /*way = $http({method:'Get', url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        adress + '&key=AIzaSyAm3paLs5nRPBcwOe8uzKNX-MnQ18v7E8c'})*/
            .then(function (response) {
                return response.data;
            });
        return way;
    };
    waypointUpdateObj.createWaypoint = function (way) {
        var Way;

        Way = $http({method:'Post', url:'http://localhost:50615/api/AdditionalPoint', data: way}).
            then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Way;
    };
    waypointUpdateObj.getWaypointByAnnouncementId = function (aid) {
        var Way;

        Way=$http.get('http://localhost:50615/api/AdditionalPoint/'+aid)
            .then(function (response) {
                return response.data;
            });
        return Way;
    };
    return waypointUpdateObj;
});

myAngularModule.controller('announcementCreateController', function ($scope, registerService, announcementService, utilityService, userService, $rootScope, $cookies, $location, $timeout, NgMap, waypointService) {
    $scope.ways= [];
    registerService.getAll().then(function (result) {
        $scope.deps = result;
        $('select').material_select();
    });
    $scope.Decode = function (Adr) {
        waypointService.decode(Adr).then(function (result) {
            /*$scope.ways = result.results[0].geometry.location;
            console.log($scope.ways);*/
            $scope.adr = Adr;
            $scope.ways = [
                {location: result.results[0].geometry.location,stopover: true}
            ];
        });
    };


    $scope.CreateAnnouncement = function (Ann,Tmp, IsValid, ways) {
        $rootScope.UsrSignIn = JSON.parse($cookies.get("UsrSignIn"));
        Ann.AutorRefUser = $rootScope.UsrSignIn.Email;
        var x = moment.utc(Tmp.Date+'T'+Tmp.Time, 'DD-MMM-YYYY HH:mm', 'pl');
        Ann.StartDate = new Date();
        Ann.StartDate = x;
        if(IsValid){
            announcementService.createAnnouncement(Ann).then(function (result) {
                if($scope.ways.length !==0) {
                    var Waypoint = {};
                    Waypoint.Lat = $scope.ways[0].location.lat;
                    Waypoint.Lng = $scope.ways[0].location.lng;
                    Waypoint.Adress = $scope.adr;
                    Waypoint.AnnouncementId = result.AnnouncementId;
                    waypointUpdateObj.createWaypoint(Waypoint).then(function (result2) {
                        /* $console.log("z punktem dodatkowym "+result2);*/
                    });
                }
                    $scope.Msg = "Utworzyłes ogłoszenie." ;
                    $scope.Flg = true;
                    Materialize.toast($scope.Msg,5000);
                        $location.path('/announcement');
            });
        }

    };
    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('#timepicker').pickatime({
        autoclose: false,
        twelvehour: false,
        default: '14:20:00'
    });
    $scope.Sprawdz = function (Ann) {
      //  console.log(Ann);
        var x = moment(Ann.Date+'T'+Ann.Time, 'DD-MMM-YYYY HH:mm', 'pl');
        console.log(x.format('DD-MM-YYYY')+' '+x.format('HH:mm'));
    };

});