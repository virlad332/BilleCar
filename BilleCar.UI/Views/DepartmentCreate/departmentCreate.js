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
                    $scope.Msg = "Utworzyłeś oddział, za 5 sekund zostaniesz przekierowany do listy oddziałów.";
                    Materialize.toast($scope.Msg,5000);
                    $timeout(function () {
                        $location.path('/oddzialy');
                    }, 5000);
                }
                else{
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        };
    };

});