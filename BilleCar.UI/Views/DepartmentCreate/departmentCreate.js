myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/departmentCreate',{
            templateUrl: 'Views/DepartmentCreate/DepartmentCreate.html',
            controller: 'departmentCreateController'
        });
});
myAngularModule.controller('departmentCreateController', function ($scope, departmentService, $timeout, $location) {
    $scope.createDepartment = function (Dep, IsValid) {
        if(IsValid){
            departmentService.CreateDepartment(Dep).then(function (result) {
                if(result.ModelState == null){
                    $scope.Msg = "Utworzyłeś oddział.";
                    Materialize.toast($scope.Msg,5000);
                        $location.path('/oddzialy');
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        };
    };

});