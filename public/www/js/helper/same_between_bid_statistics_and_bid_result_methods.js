/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-16
 * Time: 下午12:00
 * To change this template use File | Settings | File Templates.
 */
function same_between_bid_statistics_and_bid_result_methods($scope) {

    $scope.bid_name = $scope.bid_name = Bid.get_click_bid().name
    $scope.stats_bid_sign_up_person = BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid().length
    $scope.bid_sign_up_result_infos = BidSignUp.get_bid_sign_up_result_infos()
    $scope.statistics_results = BidSignUp.statistics_bid_price_count_for_current_activity_bid()

    $scope.judge_show_winner_info = function() {
        var winner_info = BidSignUp.get_winner_for_current_bid()
        if(winner_info) {
            $scope.show_winner_info = "竞价结果" + ":  " + winner_info.name + "  " + "¥" + winner_info.price + "  " + winner_info.phone
            $scope.footer_tips = "恭喜竞价成功！"
            return
        }
        $scope.show_winner_info = "竞价结果:  竞价无效"
        $scope.footer_tips = "没有竞价成功者！"
    }

    $scope.judge_show_winner_info()
}