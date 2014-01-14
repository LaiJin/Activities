/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-2
 * Time: 下午3:10
 * To change this template use File | Settings | File Templates.
 */
function ActivitySignUpController($scope, $navigate) {

    $scope.jump_to_activity_list_view = function() {
        $navigate.go('/activity_list_view', 'slide')
    }

    $scope.is_activity_end = function() {
       return ActivityInfo.get_click_activity().status != "end"
    }

    $scope.is_show_btn = function() {
        var click_activity = ActivityInfo.get_click_activity()
        var check_activity_status = {start: false, un_start: true, end: false}
        return check_activity_status[click_activity.status]
    }

    $scope.is_have_activity_starting = function() {
        return ActivityInfo.get_starting_activity().status == "start"
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
        }

    }

    $scope.refresh_activity_sign_up_infos = function() {
        $scope.activity_sign_up_infos_for_current_activity = ActivitySignUp.get_activity_sign_up_infos_for_click_activity()
        $scope.stats_activity_sign_up_person = $scope.activity_sign_up_infos_for_current_activity.length
    }

    $scope.jump_to_bid_list_view = function() {
        if(ActivityInfo.get_click_activity().status != "end") {
            alert("抱歉，报名活动还为结束，无法进入竞价页面！")
        } else {
            $navigate.go('/bid_list_view', 'slide')
        }

    }

    $scope.refresh_activity_sign_up_infos()

}