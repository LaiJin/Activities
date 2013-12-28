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
        $http.post('/users/mobile_client_user_login',{name:name, password:password})
            .success(function(response) {

                if(JSON.parse(response) == true) {
                    localStorage.current_user = $scope.name
                    $navigate.go('/activity_list_view', 'slide')
                }else {
                    alert("用户名或密码错误");
                }
            }).error(function() {
                alert("请求服务器端出现错误")
            })
    }

}