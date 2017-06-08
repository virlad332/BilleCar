myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/register',{
            templateUrl: 'Views/Register/Register.html',
            controller: 'registerController'
        });
});
//myAngularModule.controller('registerController', function ($scope, $http) {
//    $http.get('http://localhost:55068/api/register/').then(function (response) {
//        $scope.registers = response.data;
//    });
//});

myAngularModule.factory('registerService', function ($http) {
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
myAngularModule.factory('userService', function ($http) {
    usrObj = {};
    usrObj.getAll = function () {
        var usrs;
        usrs = $http({ method: 'Get', url: 'http://localhost:50615/api/User' }).
        then(function (response) {
            return response.data;
        });
        return usrs;
    };
    usrObj.createUser = function (usr) {
        var Usr;

        Usr = $http({ method: 'Post', url: 'http://localhost:50615/api/User', data: usr }).
        then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Usr;
    };
    usrObj.changeRole = function (usr) {
        var Usr;
        if(usr.Role == 'admin'){
            usr.Role = 'user';
        }
        else{
            usr.Role = 'admin';
        }
        Usr = $http({method:'Put', url:'http://localhost:50615/api/User', data: usr}).
            then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Usr;
    };
    usrObj.getUserByEmail = function (uemail) {
        var Usr;

        Usr = $http({method:'Get', url :'http://localhost:50615/api/User', params:{email: uemail}}).
            then(function (response) {
            return response.data;
        });
        return Usr;
    };
    usrObj.changePassword = function (usr) {
        var Usr;

        Usr = $http({method:'Put', url:'http://localhost:50615/api/ChangePassword', data: usr}).
            then(function (response) {
            return response.data;
        }, function (error) {
            return error.data;
        });
        return Usr;
    };

    return usrObj;
});
myAngularModule.controller('registerController', function ($scope, registerService, userService, $location, $timeout) {
    $scope.msg = "Witaj mordo";
    $scope.re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    $scope.emailRegEx = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    registerService.getAll().then(function (result) {
        $scope.deps = result;
        $('select').material_select();
    });
    userService.getAll().then(function (result) {
        $scope.usrs = result;
    });
    $scope.CreateUser = function (Usr, IsValid) {
        if (IsValid) {
            userService.createUser(Usr).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "Utworzyles konto " + result.Email;
                    $scope.Flg = true;
                    Materialize.toast($scope.Msg+".", 5000);
                        $location.path('/login');
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    }
});

	