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
       return ActivityInfo.get_current_activity().status != "end"
    }

    $scope.is_show_btn = function() {
        var current_activity = ActivityInfo.get_current_activity()
        var judge_activity_status = {start: false, un_start: true, end: false}
        return judge_activity_status[current_activity.status]
    }

    $scope.start_activity = function() {

        if(confirm("确定要开始活动吗?")) {
            var current_activity = ActivityInfo.get_current_activity()
            var activity_array   = ActivityInfo.get_activity_array()
            current_activity.status = "start"
            ActivityInfo.set_current_activity(current_activity)
            _.find(activity_array, function(activity) {return activity.name == current_activity.name}).status = "start"
//        _.map(activity_array, function(activity) {
//            if (activity.name == current_activity.name) {
//                activity.status = current_activity.status
//                return activity
//            }
//            return activity
//        })
            ActivityInfo.update_activity_array(activity_array)
        }

    }

    $scope.finish_activity = function() {

        if(confirm("确定要结束任务吗?")) {
            var current_activity = ActivityInfo.get_current_activity()
            var activity_array = ActivityInfo.get_activity_array()
            current_activity.status = "end"
            ActivityInfo.set_current_activity(current_activity)
            _.find(activity_array, function(activity) {return activity.name == current_activity.name}).status = "end"
            ActivityInfo.update_activity_array(activity_array)
        }

    }

}