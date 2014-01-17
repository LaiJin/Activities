/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-27
 * Time: 下午2:16
 * To change this template use File | Settings | File Templates.
 */

function MobileClientUserLoginController($scope,$navigate,$http)
{
    $scope.login_party_bid = function() {

        var name = $scope.name
        var password = $scope.password
        $http.post('/users/mobile_client_user_login', {name: name, password: password})
            .success(function(response) {

                if(JSON.parse(response) == true) {
                    User.set_current_user_name($scope.name)
                    scope_function_in_controller.user_login($scope, $navigate)
                    if(_.isEmpty(ActivityInfo.get_activity_array())) {
                        alert("活动列表未空，请您先创建活动。")
                        $scope.jump_to_create_activity_view()
                    } else {
                        $scope.jump_to_activity_list_view()
                    }
                } else {
                    alert("用户名或密码错误！");
                }
            }).error(function() {
                alert("请求服务器端出现错误！")
            })
    }

}