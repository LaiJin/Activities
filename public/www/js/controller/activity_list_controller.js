/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-28
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
function ActivityListController($scope, $http, $navigate) {

    scope_function_in_controller.activity_list($scope, $navigate)

    $scope.activity_array = ActivityInfo.get_activities_for_current_user()

    $scope.is_btn_click = function () {
        return (ActivityInfo.get_starting_activity().status != "start" && Bid.get_biding().status != "start")
    }

    $scope.jump_to_detail_activity = function(activity) {
        ActivityInfo.set_click_activity(activity)
        if(ActivityInfo.get_starting_activity().status != "start" ) {
            ActivityInfo.set_starting_activity(activity)
        }
        $scope.jump_to_activity_sign_up_view()
    }

    $scope.synchronous_data = function() {
        synchronous_all_data($http)
    }

}