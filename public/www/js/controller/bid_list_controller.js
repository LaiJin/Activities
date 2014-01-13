/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午1:06
 * To change this template use File | Settings | File Templates.
 */
function BidListController($scope, $navigate) {

    $scope.jump_to_activity_list_view = function() {
        $navigate.go('activity_list_view', 'slide')
    }

    $scope.jump_to_activity_sign_up_view = function() {
        $navigate.go('activity_sign_up_view', 'slide')
    }

}