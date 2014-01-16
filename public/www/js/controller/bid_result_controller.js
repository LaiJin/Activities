/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-15
 * Time: 下午2:15
 * To change this template use File | Settings | File Templates.
 */
function BidResultController($scope, $navigate, $timeout) {

    scope_function_in_controller.same_bids($scope, $navigate)

    same_between_bid_statistics_and_bid_result_methods($scope)

    $timeout(function() {
        $('#myModal').modal('show');
        $timeout(function() {
            $('#myModal').modal('hide');
        }, 3000)
    }, 1)

}
