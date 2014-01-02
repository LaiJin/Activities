/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-28
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
function ActivityListController($scope, $http, $navigate)
{

    $scope.go_to_create_activity_view = function() {

        $navigate.go('/create_activity_view','slide')
    }

    $scope.current_activity_array = ActivityInfo.get_current_activity_array()

    $scope.go_to_detail_activity = function(activity) {

        ActivityInfo.set_current_activity(activity)
        $navigate.go('/sign_up_view', 'slide')
    }

    $scope.synchronous_data = function() {

        var user_name = localStorage.current_user
        var activity_infos = []
        for(var i=0; i<20; i++) {
            var ac = new ActivityInfo(user_name, JSON.stringify(i))
            activity_infos.push(ac)
        }

        $http.post('/users/synchronous_data', {name: user_name, activity_infos:activity_infos})
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