/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-2
 * Time: 下午3:10
 * To change this template use File | Settings | File Templates.
 */
function ActivitySignUpController($scope, $navigate, $http) {

    scope_function_in_controller.activity_sign_up($scope, $navigate)

    $scope.is_activity_end = function() {
       return ActivityInfo.get_click_activity().status != "end"
    }

    $scope.is_show_btn = function() {
        var click_activity = ActivityInfo.get_click_activity()
        var check_activity_status = {start: false, un_start: true, end: false}
        return check_activity_status[click_activity.status]
    }

    $scope.is_have_activity_starting = function() {
        return (ActivityInfo.get_starting_activity().status == "start" || Bid.get_biding().status == "start")
    }

    $scope.start_activity = function() {
        if(confirm("确定要开始活动吗?")) {
            var click_activity = ActivityInfo.get_click_activity()
            ActivityInfo.update_activity_status(click_activity, "start")
        }
    }

    $scope.finish_activity = function() {
        if(confirm("确定要结束任务吗?")) {
            var starting_activity = ActivityInfo.get_starting_activity()
            ActivityInfo.update_activity_status(starting_activity, "end")
            $scope.jump_to_bid_list_view()
        }
    }

    $scope.refresh_sign_up_infos = function(new_activity_sign_up_info) {
        $scope.activity_sign_up_infos_for_current_activity = ActivitySignUp.get_activity_sign_up_infos_for_click_activity()
        $scope.stats_activity_sign_up_person = $scope.activity_sign_up_infos_for_current_activity.length
        if(new_activity_sign_up_info) {
            var new_activity_sign_ups = [new_activity_sign_up_info]
            $http.post('/user_mobile_client_info_show/add_new_activity_sign_up_info', {
                new_activity_sign_ups: new_activity_sign_ups
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

    $scope.refresh_sign_up_infos()

    $scope.is_jump_to_bid_list_view = function() {
        if(ActivityInfo.get_click_activity().status != "end") {
            alert("抱歉，报名活动还为结束，无法进入竞价页面！")
            return
        }
        $scope.jump_to_bid_list_view()
    }

}