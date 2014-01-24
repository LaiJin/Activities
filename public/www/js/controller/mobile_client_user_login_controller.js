/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-27
 * Time: 下午2:16
 * To change this template use File | Settings | File Templates.
 */

function MobileClientUserLoginController($scope, $navigate, $http)
{

    $scope.login_party_bid = function() {
        var name = $scope.name
        var password = $scope.password
        mobile_client_user_login($http, $scope, $navigate, name, password)
    }

}