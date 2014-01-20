/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午2:12
 * To change this template use File | Settings | File Templates.
 */
function BidSignUpController($scope, $navigate, $http) {

    scope_function_in_controller.same_bids($scope, $navigate)

    $scope.bid_name = Bid.get_click_bid().name

    $scope.is_biding_end = function() {
        return Bid.get_click_bid().status != "end"
    }

    $scope.finish_biding = function() {
        if(confirm("确定要结束任务吗?")) {
            BidSignUp.analysis_out_winner_for_current_activity_biding()
            Bid.update_bid_status($http)
            $scope.jump_to_bid_result_view()
        }
    }

    $scope.refresh_sign_up_infos = function(new_bid_sign_up_info) {
        $scope.bid_sign_up_infos_for_current_bid = BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid()
        $scope.stats_bid_sign_up_person = $scope.bid_sign_up_infos_for_current_bid.length
//        console.log(new_bid_sign_up_info)
        if(new_bid_sign_up_info) {
            var new_bid_sign_ups = [new_bid_sign_up_info]
            $http.post('/user_mobile_client_info_show/update_synchronous_show_bid_sign_up_info', {
                new_bid_sign_ups: new_bid_sign_ups
            })
                .success(function(response) {
                    if(JSON.parse(response) == true) {
                        alert("同步数据成功")
                    }else {
                        alert("同步数据失败")
                    }
                }).error(function() {
                    alert("请求服务器端出现问题")
                })
        }
    }

    $scope.refresh_sign_up_infos()

}