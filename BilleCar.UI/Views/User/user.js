/**
 * Created by Zduno on 2017-05-05.
 */
myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/user',{
            templateUrl: 'Views/User/User.html',
            controller: 'userController'
        });
});
myAngularModule.controller('userController', function ($scope, userService, announcementService) {
    userService.getAll().then(function (result) {
        $scope.usrs = result;
        announcementService.getAll().then(function (result2) {
            $scope.anns = result2;
            angular.forEach($scope.usrs, function (value, key) {
                var counter = 0;
                angular.forEach($scope.anns, function (value2, key2) {

                    if(value.Email === value2.AutorRefUser){
                        counter++;
                    }
                });
                if(counter !==0){
                    $scope.usrs[key].Count = counter;
                }
                else{
                    $scope.usrs[key].Count = 0;
                }
            });
        });
    });

    $scope.ChangeRole = function (Usr) {
        userService.changeRole(Usr).then(function (result) {
            if (result.ModelState == null){
                $scope.Msg = "Zmieniono uprawnienia";
                Materialize.toast($scope.Msg,4000);
                userService.getAll().then(function (result) {
                    $scope.usrs = result;
                    announcementService.getAll().then(function (result2) {
                        $scope.anns = result2;
                        angular.forEach($scope.usrs, function (value, key) {
                            var counter = 0;
                            angular.forEach($scope.anns, function (value2, key2) {

                                if(value.Email === value2.AutorRefUser){
                                    counter++;
                                }
                            });
                            if(counter !==0){
                                $scope.usrs[key].Count = counter;
                            }
                            else{
                                $scope.usrs[key].Count = 0;
                            }
                        });
                    });
                });
            }
            else{
                $scope.serverErrorMsgs = result.ModelState;
            }
        });
    };
});