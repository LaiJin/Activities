/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-15
 * Time: 下午2:15
 * To change this template use File | Settings | File Templates.
 */
function BidResultController($scope, $navigate, $timeout) {

    $scope.jump_to_bid_list_view = function() {
        navigate_go.bid_list_view($navigate)
    }

    $scope.jump_to_bid_statistics_view = function() {
        navigate_go.bid_statistics_view($navigate)
    }

    same_between_bid_statistics_and_bid_result_methods($scope)

    $timeout(function() {
        $('#myModal').modal('show');
        $timeout(function() {
            $('#myModal').modal('hide');
        }, 3000)
    }, 1)

}
