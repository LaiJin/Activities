/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午1:06
 * To change this template use File | Settings | File Templates.
 */
function BidListController($scope, $navigate) {

    scope_function_in.bid_list($scope, $navigate)

    $scope.bids = Bid.get_bids_for_current_click_activity()

    $scope.jump_to_detail_bid = function(bid) {
        Bid.set_click_bid(bid)
        if(Bid.get_biding().status != "start" ) {
            Bid.set_biding(bid)
        }
        $scope.jump_to_bid_sign_up_view()
    }

    $scope.is_can_create_new_bid_click = function() {
        return Bid.get_biding().status != "start"
    }

    $scope.create_new_bid = function() {
        Bid.create_new_bid()
        $scope.jump_to_bid_sign_up_view()
    }

}