/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-16
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */

var scope_function_in = {
     create_activity: function($scope, $navigate) {same_between_create_activity_and_bid_list($scope, $navigate)},
       activity_list: function($scope, $navigate) {jump_to_create_activity_view($scope, $navigate); jump_to_activity_sign_up_view($scope, $navigate)},
    activity_sign_up: function($scope, $navigate) {jump_to_activity_list_view($scope, $navigate); jump_to_bid_list_view($scope, $navigate)},
            bid_list: function($scope, $navigate) {same_between_create_activity_and_bid_list($scope, $navigate); jump_to_bid_sign_up_view($scope, $navigate)},
           same_bids: function($scope, $navigate) {same_between_bid_sign_up_and_bid_statistics_and_bid_result($scope, $navigate)},
          user_login: function($scope, $navigate) {jump_to_create_activity_view($scope, $navigate); jump_to_activity_list_view($scope, $navigate)}
}


function same_between_create_activity_and_bid_list($scope, $navigate) {
    jump_to_activity_list_view($scope, $navigate);
    jump_to_activity_sign_up_view($scope, $navigate)
}

function same_between_bid_sign_up_and_bid_statistics_and_bid_result($scope, $navigate) {
    jump_to_bid_list_view($scope, $navigate)
    jump_to_bid_result_view($scope, $navigate)
    jump_to_bid_statistics_view($scope, $navigate)
}

function jump_to_create_activity_view($scope, $navigate) {
    $scope.jump_to_create_activity_view = function() {
        $navigate.go('create_activity_view', 'slide')
    }
}

function jump_to_activity_list_view($scope, $navigate) {
    $scope.jump_to_activity_list_view = function() {
        $navigate.go('activity_list_view', 'slide')
    }
}

function jump_to_activity_sign_up_view($scope, $navigate) {
    $scope.jump_to_activity_sign_up_view = function() {
        $navigate.go('activity_sign_up_view', 'slide')
    }
}

function jump_to_bid_list_view($scope, $navigate) {
    $scope.jump_to_bid_list_view = function(){
        $navigate.go('bid_list_view', 'slide')
    }
}

function jump_to_bid_sign_up_view($scope, $navigate) {
    $scope.jump_to_bid_sign_up_view = function() {
        $navigate.go('bid_sign_up_view', 'slide')
    }
}

function jump_to_bid_result_view($scope, $navigate) {
    $scope.jump_to_bid_result_view = function() {
        $navigate.go('bid_result_view', 'slide')
    }
}

function jump_to_bid_statistics_view($scope, $navigate) {
    $scope.jump_to_bid_statistics_view = function() {
        $navigate.go('bid_statistics_view', 'slide')
    }
}



//function jump_to($scope, $navigate) {
//
//    $scope.jump_to_create_activity_view = function() {
//        $navigate.go('create_activity_view', 'slide')
//    }
//
//    $scope.jump_to_activity_list_view = function() {
//        $navigate.go('activity_list_view', 'slide')
//    }
//
//    $scope.jump_to_activity_sign_up_view = function() {
//        $navigate.go('activity_sign_up_view', 'slide')
//    }
//
//    $scope.jump_to_bid_list_view = function(){
//        $navigate.go('bid_list_view', 'slide')
//    }
//
//    $scope.jump_to_bid_sign_up_view = function() {
//        $navigate.go('bid_list_view', 'slide')
//    }
//
//    $scope.jump_to_bid_result_view = function() {
//        $navigate.go('bid_result_view', 'slide')
//    }
//
//    $scope.jump_to_bid_statistics_view = function() {
//        $navigate.go('bid_statistics_view', 'slide')
//    }
//
//}
