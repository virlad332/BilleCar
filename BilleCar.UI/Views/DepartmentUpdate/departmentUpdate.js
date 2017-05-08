myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/DepartmentUpdate/:DepartmentId?', {
            templateUrl: 'Views/DepartmentUpdate/DepartmentUpdate.html',
            controller: 'departmentUpdateController'
        });
});
myAngularModule.controller('departmentUpdateController', function ($scope, $routeParams, departmentByIdService) {
    $scope.did = $routeParams.DepartmentId;
    departmentByIdService.GetDepById($scope.did).then(function (result) {
        $scope.dep = result;
    });
    $scope.updateDepartment = function (Dep, IsValid) {
        if(IsValid){
            departmentByIdService.UpdateDepartment(Dep).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Edycja zakończona pomyślnie";
                    Materialize.toast($scope.Msg,4000);
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };
});
