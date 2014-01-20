/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-2
 * Time: 下午2:23
 * To change this template use File | Settings | File Templates.
 */
function CreateActivityController($scope, $navigate, $http) {

    $scope.is_show_back_btn = function() {
        return !_.isEmpty(ActivityInfo.get_activity_array())
    }

    scope_function_in_controller.create_activity($scope, $navigate)

    $scope.create_activity = function() {
        var new_activity = new ActivityInfo(User.get_current_user_name(), $scope.input_activity_name)
        $scope.is_show_name_repeat_warning = ActivityInfo.check_activity_name_is_same(new_activity)
        if(!$scope.is_show_name_repeat_warning) {
            ActivityInfo.set_click_activity(new_activity)
            ActivityInfo.set_starting_activity(new_activity)
            ActivityInfo.set_new_activity_to_array(new_activity)
            var new_activities = [new_activity]
            $http.post('/user_mobile_client_info_show/add_new_activity_info', {
                new_activities: new_activities
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
            $scope.jump_to_activity_sign_up_view()
        }
    }
}