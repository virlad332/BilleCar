myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/departmentCreate',{
            templateUrl: 'Views/DepartmentCreate/DepartmentCreate.html',
            controller: 'departmentCreateController'
        });
});
