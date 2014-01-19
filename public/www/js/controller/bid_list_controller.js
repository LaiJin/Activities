/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午1:06
 * To change this template use File | Settings | File Templates.
 */
function BidListController($scope, $navigate, $http) {

    scope_function_in_controller.bid_list($scope, $navigate)

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

        var         user_name = User.get_current_user_name()
        var        activities = ActivityInfo.get_activities_for_current_user().reverse()
        var activity_sign_ups = ActivitySignUp.get_activity_sign_up_infos_for_current_user().reverse()
        var              bids = Bid.get_bids_for_current_user().reverse()
        var      bid_sign_ups = BidSignUp.get_bid_sign_up_infos_for_current_user().reverse()

        $http.post('/users/synchronous_data', {
            user_name: user_name,
            activity_infos: activities,
            activity_sign_ups: activity_sign_ups,
            bids: bids,
            bid_sign_ups: bid_sign_ups
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
        $scope.jump_to_bid_sign_up_view()
    }

}