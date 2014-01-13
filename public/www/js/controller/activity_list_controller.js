/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-28
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
function ActivityListController($scope, $http, $navigate)
{

    $scope.jump_to_create_activity_view = function() {
        $navigate.go('/create_activity_view','slide')
    }

    $scope.activity_array = ActivityInfo.get_activity_array()

    $scope.is_btn_click = function () {
        return ActivityInfo.get_starting_activity().status != "start"
    }

    $scope.jump_to_detail_activity = function(activity) {
        ActivityInfo.set_click_activity(activity)
        if(ActivityInfo.get_starting_activity().status != "start" ) {
            ActivityInfo.set_starting_activity(activity)
        }
        $navigate.go('/activity_sign_up_view', 'slide')
    }

    $scope.synchronous_data = function() {
        var user_name = localStorage.current_user
        $http.post('/users/synchronous_data', {name: user_name, activity_infos: $scope.activity_array})
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