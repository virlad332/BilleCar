﻿myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/DepartmentUpdate/:DepartmentId?', {
            templateUrl: 'Views/DepartmentUpdate/DepartmentUpdate.html',
            controller: 'departmentUpdateController'
        });
});
myAngularModule.controller('departmentUpdateController', function ($scope, $routeParams, departmentByIdService, $timeout, $location, $window) {
    $scope.did = $routeParams.DepartmentId;
    departmentByIdService.GetDepById($scope.did).then(function (result) {
        $scope.dep = result;
    });
    $scope.updateDepartment = function (Dep, IsValid) {
        if(IsValid){
            departmentByIdService.UpdateDepartment(Dep).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Edycja zakończona pomyślnie, za 5 sekund zostaniesz przekierowany do listy oddziałów.";
                    Materialize.toast($scope.Msg,5000);
                    $timeout(function () {
                        $location.path('/oddzialy');
                    },5000);
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };
    $scope.deleteDepartmentById = function (Dep) {
        if($window.confirm("Chcesz usunąć oddział "+Dep.Name+" ?")){
            departmentByIdService.DeleteDepartmentById(Dep.DepartmentId).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Usunąłeś oddział.";
                    Materialize.toast($scope.Msg,5000);
                        $location.path('/oddzialy');
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };
});
