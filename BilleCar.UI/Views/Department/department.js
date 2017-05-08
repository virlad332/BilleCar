myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when('/oddzialy', {
            templateUrl: 'Views/Department/Department.html',
            controller: 'departmentController'
        });
});
myAngularModule.factory('departmentService', function ($http) {
    depObj = {};
    depObj.getAll = function () {
        var deps;
        deps = $http({ method: 'Get', url: 'http://localhost:50615/api/Department/' }).
        then(function (response) {
            return response.data;
        });
        return deps;
    };

    return depObj;
});
myAngularModule.controller('departmentController', function ($scope, departmentService) {
    departmentService.getAll().then(function (result) {
        $scope.deps = result;
    });
});

    

	
