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
        var activity_array = ActivityInfo.get_activity_array()
        return _.some(activity_array, function(activity) {return activity.status == "start"})
    }

    $scope.start_activity = function() {

        if(confirm("确定要开始活动吗?")) {
            var click_activity = ActivityInfo.get_click_activity()
            var activity_array = ActivityInfo.get_activity_array()
            click_activity.status = "start"
            ActivityInfo.set_starting_activity(click_activity)
            ActivityInfo.set_click_activity(click_activity)
            _.find(activity_array, function(activity) {return activity.name == click_activity.name}).status = "start"
            ActivityInfo.update_activity_array(activity_array)
        }

    }

    $scope.finish_activity = function() {

        if(confirm("确定要结束任务吗?")) {
            var starting_activity = ActivityInfo.get_starting_activity()
            var activity_array = ActivityInfo.get_activity_array()
            starting_activity.status = "end"
            ActivityInfo.set_starting_activity(starting_activity)
            ActivityInfo.set_click_activity(starting_activity)
            _.find(activity_array, function(activity) {return activity.name == starting_activity.name}).status = "end"
            ActivityInfo.update_activity_array(activity_array)
        }

    }

    $scope.refresh_sigu_up_infos = function() {
        $scope.sign_up_infos_for_current_activity =  Signup.get_sign_up_infos_for_click_activity()
        $scope.stats_sign_up_person = $scope.sign_up_infos_for_current_activity.length
    }

    $scope.refresh_sigu_up_infos()

}