/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-15
 * Time: 下午8:18
 * To change this template use File | Settings | File Templates.
 */
function BidStatisticsController($scope, $navigate) {

    $scope.jump_to_bid_result_view = function() {
        navigate_go.bid_result_view($navigate)
    }

    $scope.jump_to_bid_list_view = function(){
        navigate_go.bid_list_view($navigate)
    }

    same_between_bid_statistics_and_bid_result_methods($scope)

}
