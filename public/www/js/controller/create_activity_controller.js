/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-2
 * Time: 下午2:23
 * To change this template use File | Settings | File Templates.
 */
function CreateActivityController($scope, $navigate, $http) {

    $scope.is_show_back_btn = function() {

        return ActivityInfo.get_activity_array().length != 0
    }

    $scope.jump_to_activity_list_view = function() {

        $navigate.go('/activity_list_view', 'slide')
    }

    $scope.jump_to_activity_sign_up_view = function() {

        var new_activity = new ActivityInfo(localStorage.current_user, $scope.input_activity_name)
        if(!check_name_is_same(ActivityInfo.get_activity_array(), new_activity)) {
            ActivityInfo.set_current_activity(new_activity)
            ActivityInfo.set_new_activity_to_array(new_activity)
            $navigate.go('/activity_sign_up_view', 'slide')
        }
    }

}

function check_name_is_same(activity_array, new_activity) {

    var is_name_same = false
    _.each(activity_array, function(activity) {

        if(activity.name == new_activity.name) {

            alert("活动名称重复, 请重新输入！")
            is_name_same = true
        }
    })

    return is_name_same
}