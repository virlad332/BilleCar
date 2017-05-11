myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "Views/Home/Home.html",
            controller:'homeController'
        });
});
myAngularModule.controller('homeController', function ($scope, announcementService, $rootScope, NgMap) {
    $scope.DepId = $rootScope.UsrSignIn.DepartmentRefId;
    $scope.uemail = $rootScope.UsrSignIn.Email;
    announcementService.getAll().then(function (result) {
        $scope.anns = result;
        var counter = 0;
        var counter2 = 0;
        angular.forEach($scope.anns, function (value, key) {
            if (value.DepartmentRefId === $scope.DepId){
                counter++;
            }
            if(value.AutorRefUser === $scope.uemail){
                counter2++;
            }
            if(counter2!==0){
                $scope.iloscMoich = counter2;
            }
            else{
                $scope.iloscMoich = 0;
            }
            if(counter!==0){
                $scope.ilosc = counter;
            }
            else{
                $scope.ilosc = 0;
            }
        })
    });


     /*console.log($rootScope.UsrSignIn.DepartmentRefId);*/

   var counter;
   angular.forEach($scope.anns, function (value, key) {
       if (value.DepartmentRefId === $scope.DepId){
           counter++;
       }
       if(counter!==0){
           $scope.ilosc = counter;
       }
       else{
           $scope.ilosc = 0;
       }
   });

    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });

});