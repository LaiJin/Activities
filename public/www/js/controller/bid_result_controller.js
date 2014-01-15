/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-15
 * Time: 下午2:15
 * To change this template use File | Settings | File Templates.
 */
function BidResultController($scope, $navigate, $timeout) {

    $scope.jump_to_bid_list_view = function() {
        $navigate.go('bid_list_iew', 'slide')
    }

    $scope.jump_to_bid_statistics_view = function() {
        $navigate.go('bid_statistics_view', 'slide')
    }

    $scope.bid_name = $scope.bid_name = Bid.get_click_bid().name
    $scope.bid_sign_up_result_infos = _.sortBy(BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid(), function(bid_sign_up_info) {return bid_sign_up_info.price})
    $scope.stats_bid_sign_up_person = $scope.bid_sign_up_result_infos.length

    $scope.judge_show_winner_info = function() {
        var winner_info = BidSignUp.get_winner_for_current_bid()
        if(winner_info) {
            $scope.show_winner_info = "竞价结果" + ":  " + winner_info.name + "  " + "¥" + winner_info.price + "  " + winner_info.phone
            return
        }
        $scope.show_winner_info = "竞价结果:  竞价无效"
    }

    $scope.judge_show_winner_info()

//    $scope.close_pop = function() {
//        $scope.pop_out_result = "hide modal fade";
//        $scope.back_hide = "hide modal-backdrop fade";
//    }
//
//    $timeout(function() {
//        $scope.pop_out_result = "hide modal fade";
//        $scope.back_hide = "hide modal-backdrop fade";
//    },3000)

    $timeout(function() {
        $('#myModal').modal('show');
        $timeout(function() {
            $('#myModal').modal('hide');
        }, 3000)
    }, 1)




}