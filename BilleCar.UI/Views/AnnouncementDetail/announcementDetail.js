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
    annUpdateOjb.takeSlot = function (ann) {
        var Ann;
        Ann = $http({ method: 'Put', url: 'http://localhost:50615/api/Announcement', data: ann }).
        then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Ann;
    }

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

    depUpdateObj.UpdateDepartment = function (dep) {
        var Dep;

        Dep = $http({method:'Put', url:'http://localhost:50615/api/Department', data: dep}).
            then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Dep;
    };
    depUpdateObj.DeleteDepartmentById = function (did) {
        var Dep;

        Dep = $http({method:'Delete', url:'http://localhost:50615/api/Department', params:{id: did}}).
            then(function (response) {
            return response.data;
        });
        return Dep;
    };
    return depUpdateObj;
});
myAngularModule.factory('announcementUserService', function ($http) {
    annUsrObj = {};

    annUsrObj.getByUserIdAndAnnouncementId = function (UserId, AnnouncementId) {
        var AnnUsr;

        AnnUsr = $http({method:'Get', url:'http://localhost:50615/api/AnnoucmentUser', params:{userId: UserId,announcementId: AnnouncementId}}).
            then(function (response) {
            return response.data;
        });
        return AnnUsr;
    };

    annUsrObj.createReservation = function (annUsr) {
        var AnnUsr;

        AnnUsr = $http({method:'Post', url:'http://localhost:50615/api/AnnoucmentUser', data: annUsr}).
            then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return AnnUsr;
    };
    
    annUsrObj.deleteReservation = function (annUsrId) {
        var AnnUsr;

        AnnUsr = $http({method:'Delete', url:'http://localhost:50615/api/AnnoucmentUser', params:{id: annUsrId}}).
            then(function (response) {
            return response.data;
        });
        return AnnUsr;
    };
    return annUsrObj;
});
myAngularModule.controller('announcementDetailController', function ($scope,$rootScope, $routeParams, $cookies, announcementDetailService, userByEmailService, departmentByIdService, announcementService, utilityService, $window, $timeout, $location, NgMap, waypointService, announcementUserService, $route) {
    $scope.msg = "Witaj mordo na details";
    $scope.ways = [];
    $scope.aid = $routeParams.AnnouncementId;
    $rootScope.UsrSignIn = JSON.parse($cookies.get("UsrSignIn"));
    $scope.reservated = [];
    AnnUsr = {};
    AnnUsr.AnnoucmentUserRef = $rootScope.UsrSignIn.Email;
    AnnUsr.AnnoucmentUserRefAnnoucment = $routeParams.AnnouncementId;
    announcementDetailService.GetByID($scope.aid).then(function (result) {
        $scope.anns = result;
        angular.forEach($scope.anns.AnnoucmentUser, function (value, key) {
            userByEmailService.GetByEmail(value.AnnoucmentUserRef).then(function (result) {
                $scope.reservated.push(result.Name+" "+result.SurName);

            });
        });
        moment.locale('pl');
        var x = moment(result.StartDate);
        $scope.Date = x.format('DD-MMMM-YYYY');
        $scope.Time = x.format('HH:mm');
        console.log(x.format('DD-MMMM-YYYY'));

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
    announcementUserService.getByUserIdAndAnnouncementId(AnnUsr.AnnoucmentUserRef,AnnUsr.AnnoucmentUserRefAnnoucment).then(function (result) {
        if(result !== undefined) {
            $scope.reservation = result;
        }
    });

    waypointService.getWaypointByAnnouncementId($scope.aid).then(function (result) {
        if (typeof result[0].Lat === 'undefined' || result[0].Lat ===null){
           $scope.ways = [];
        }
        else {
            var x = parseFloat(result[0].Lat);
            var y = parseFloat(result[0].Lng);
            $scope.ways =[
                {location: {lat:x, lng:y}, stopover: true}
            ];
        }
    });
    $scope.DeleteAnnouncementById = function (Ann) {
        if($window.confirm("Chcesz usunac ogloszenie nr:"+Ann.AnnouncementId+" ?")){
            announcementService.deleteAnnouncementById(Ann.AnnouncementId).then(function (result) {
                if (result.ModelState == null){
                    $scope.Msg = "Usunąles ogloszenie.";
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
    $scope.CreateReservation = function () {

        /*$scope.AnnUsr.AnnoucmentUserRef = $rootScope.UsrSignIn.Email;
        $scope.AnnUsr.AnnoucmentUserRefAnnoucment = $routeParams.AnnouncementId;*/

        announcementDetailService.GetByID($routeParams.AnnouncementId).then(function (result) {
            $scope.anns = result;
            if($scope.anns.FreeSlots > 0){
                announcementUserService.createReservation(AnnUsr).then(function (result) {
                    if(result.ModelState == null){
                        $scope.anns.FreeSlots--;
                        announcementDetailService.takeSlot($scope.anns).then(function (result) {
                            if(result.ModelState == null){
                                $scope.Msg = "Zarezerwowales miejsce.";
                                Materialize.toast($scope.Msg, 5000);
                                $route.reload();
                            }
                        });

                    }
                    else{
                        $scope.serverErrorMsgs = result.ModelState;
                    }
                });
            }
            else{
                $scope.Msg = "Nie ma już wolnych miejsc, ktoś zerezerowował miejsce przed Tobą";
                Materialize.toast($scope.Msg, 5000);
            }
        })

    };
    $scope.CancelReservation = function () {
        announcementUserService.getByUserIdAndAnnouncementId($rootScope.UsrSignIn.Email,$routeParams.AnnouncementId).then(function (result) {
            $scope.AnnUsr = result;
            announcementUserService.deleteReservation($scope.AnnUsr.AnnoucmentUserId).then(function (result) {
                if(result.ModelState == null){
                    $scope.anns.FreeSlots++;
                    announcementDetailService.takeSlot($scope.anns).then(function (result) {
                        if(result.ModelState == null){
                            $scope.Msg = "Usunąłeś rezerwację.";
                            Materialize.toast($scope.Msg,5000);
                            $route.reload();
                        }
                    });
                }
            });

        });

    };

    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });


});
