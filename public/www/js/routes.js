myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/mobile_client_user_login_view.html",
        controller: MobileClientUserLoginController
    }).when("/activity_list_view", {
            templateUrl: "pages/activity_list_view.html",
            controller: ActivityListController
        }).when("/create_activity_view", {
            templateUrl: "pages/create_activity_view.html",
            controller: CreateActivityController
        }).when("/activity_sign_up_view", {
            templateUrl: "pages/activity_sign_up_view.html",
            controller: ActivitySignUpController
        }).when("/bid_list_view", {
            templateUrl: "pages/bid_list_view.html",
            controller: BidListController
        }).when("/bid_sign_up_view", {
            templateUrl: "pages/bid_sign_up_view.html",
            controller: BidSignUpController
        }).when("/bid_result_view", {
            templateUrl: "pages/bid_result_view.html",
            controller: BidResultController
        }).when("/bid_statistics_view", {
            templateUrl: "pages/bid_statistics_view.html",
            controller: BidStatisticsController
        }).otherwise({
            redirectTo:"/"
        });

    //routing generate
    //routing generated over
});

/** Here is example
myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/activity_list_page.html",
        controller: ActivityListController
    }).when("/activity/create", {
            templateUrl: "pages/activity_create_page.html",
            controller: ActivityCreateController
        }).when("/sign_ups/list/:activity_name", {
            templateUrl: "pages/apply_page.html",
            controller: SignUpListController
        }).otherwise({
            redirectTo: "/"
        });
});
**/