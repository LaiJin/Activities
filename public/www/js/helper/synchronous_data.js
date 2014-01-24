/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-24
 * Time: 上午11:02
 * To change this template use File | Settings | File Templates.
 */



function mobile_client_user_login($http, $scope, $navigate, name, password) {
    $http.post('/data_synchronous/mobile_client_user_login', {name: name, password: password})
        .success(function(response) {
            if(JSON.parse(response) == true) {
                User.set_current_user_name($scope.name)
                scope_function_in_controller.user_login($scope, $navigate)
                judge_activity_list_is_empty($scope)
                return
            }
            alert("用户名或密码错误！")
        }).error(function() {
            alert("请求服务器端出现错误！")
        })
}

function judge_activity_list_is_empty($scope) {
    if(_.isEmpty(ActivityInfo.get_activities_for_current_user())) {
        alert("活动列表未空，请您先创建活动。")
        $scope.jump_to_create_activity_view()
        return
    }
    $scope.jump_to_activity_list_view()
}

function synchronous_all_data($http) {
    var         user_name = User.get_current_user_name()
    var        activities = ActivityInfo.get_activities_for_current_user().reverse()
    var activity_sign_ups = ActivitySignUp.get_activity_sign_up_infos_for_current_user().reverse()
    var              bids = Bid.get_bids_for_current_user().reverse()
    var      bid_sign_ups = BidSignUp.get_bid_sign_up_infos_for_current_user().reverse()
    var data = {
        user_name: user_name,
        activity_infos: activities,
        activity_sign_ups: activity_sign_ups,
        bids: bids,
        bid_sign_ups: bid_sign_ups
    }
    http_post($http, '/data_synchronous/synchronous_all_data', data)
}




function synchronous_new_activity($http, new_activity) {
    var new_activities = [new_activity]
    var data = {
        new_activities: new_activities
    }
    http_post($http, '/data_synchronous/add_new_activity_info', data)
}

function synchronous_new_activity_sign_up($http, new_activity_sign_up_info) {
    var new_activity_sign_ups = [new_activity_sign_up_info]
    var data = {
        new_activity_sign_ups: new_activity_sign_ups
    }
    http_post($http,'/data_synchronous/add_new_activity_sign_up_info', data)
}

function synchronous_new_bid($http, new_bid)  {
    var new_bids = [new_bid]
    var data =  {
        new_bids: new_bids
    }
    http_post($http,'/data_synchronous/add_new_bid', data)
}

function synchronous_new_bid_sign_up($http, new_bid_sign_up_info){
    var new_bid_sign_ups = [new_bid_sign_up_info]
    var data = {
        new_bid_sign_ups: new_bid_sign_ups
    }
    http_post($http,'/data_synchronous/update_synchronous_show_bid_sign_up_info', data)
}

function update_biding_status_and_winner_info($http, bid) {
    var biding = [bid]
    var winner_info = [BidSignUp.get_winner_for_current_bid()]
    var data =  {
        biding: biding,
        winner_info: winner_info
    }
    http_post($http,'/data_synchronous/update_biding_status_and_winner_info', data)
}

function http_post($http, post_path, data) {
    $http.post(post_path, data).success(function(response) {
        if(JSON.parse(response) == true) {
            alert("同步数据成功")
        }
    }).error(function() {
            alert("同步数据失败")
        })
}



