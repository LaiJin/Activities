/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-15
 * Time: 下午8:18
 * To change this template use File | Settings | File Templates.
 */

function BidStatisticsController($scope, $navigate) {

    $scope.jump_to_bid_result_view = function() {
        $navigate.go('/bid_result_view', 'slide')
    }

    $scope.jump_to_bid_list_view = function(){
        $navigate.go('/bid_list_view', 'slide')
    }

    $scope.bid_name = Bid.get_click_bid().name
    $scope.stats_bid_sign_up_person = BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid().length
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
//    console.log(_.keys(_.countBy(BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid(), function(af) { return af.price})))
//    $scope.judge_show_winner_info()
    //    console.log(_.keys(coun))
//    console.log(_.values(coun))
//    for(var key in coun) {
//        console.log(key)
//        console.log(coun[key])
//    }

}



//用hash表来替换掉 if

//
//
//
//    if(message.content.substring(0, 2).toUpperCase() == "BM") {
//         process_activity_sign_up_message()
//    }
//
//    if(message.content.substring(0, 2).toUpperCase() == "JJ") {
//        process_bid_sign_up_message()
//    }
//        if(ActivityInfo.get_starting_activity().status == "un_start") {
//            console.log("活动报名还未开始, 请稍后再试。")
//        }
//
//        if(ActivityInfo.get_starting_activity().status == "end") {
//            console.log("抱歉，活动报名已经结束。")
//        }