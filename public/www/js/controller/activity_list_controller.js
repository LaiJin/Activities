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

        var         user_name = User.get_current_user_name()
        var        activities = ActivityInfo.get_activities_for_current_user()
        var activity_sign_ups = ActivitySignUp.get_activity_sign_up_infos_for_current_user()
        var              bids = Bid.get_bids_for_current_user()
        var      bid_sign_ups = BidSignUp.get_bid_sign_up_infos_for_current_user()

        $http.post('/users/synchronous_data', {
                         user_name: user_name,
               activity_infos: activities,
            activity_sign_ups: activity_sign_ups,
                         bids: bids,
                 bid_sign_ups: bid_sign_ups
        })
            .success(function(response) {
                if(JSON.parse(response) == true) {
                     alert("同步数据成功")
                }else {
                    alert("同步数据失败")
                }
        }).error(function() {
                alert("请求服务器端出现问题")
            })
    }

}