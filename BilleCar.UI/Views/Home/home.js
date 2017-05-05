myAngularModule.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "Views/Home/Home.html"
        });
});