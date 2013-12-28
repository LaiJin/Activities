/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-28
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
function ActivityListController($scope, $http)
{
    $scope.synchronous_data = function() {

        var user_name = localStorage.current_user
        $http.post('/users/synchronous_data', {name: user_name})
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