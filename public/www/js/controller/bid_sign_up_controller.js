/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午2:12
 * To change this template use File | Settings | File Templates.
 */
function BidSignUpController($scope, $navigate) {

    $scope.jump_to_bid_list_view = function() {
        $navigate.go('bid_list_view', 'slide')
    }

    $scope.bid_name = Bid.get_click_bid().name

    $scope.is_biding_end = function() {
        return Bid.get_click_bid().status != "end"
    }

    $scope.finish_biding = function() {
        if(confirm("确定要结束任务吗?")) {
            Bid.update_biding_status()
        }
    }

    $scope.refresh_sign_up_infos = function() {
        $scope.bid_sign_up_infos_for_current_bid = BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid()
        $scope.stats_bid_sign_up_person = $scope.bid_sign_up_infos_for_current_bid.length
    }

    $scope.refresh_sign_up_infos()

}