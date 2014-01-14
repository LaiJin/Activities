/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午2:52
 * To change this template use File | Settings | File Templates.
 */
function BidSignUp(name, phone, price) {
    this.name = name
    this.phone = phone
    this.price = price
    this.bid_name = Bid.get_biding().name
    this.activity_name = Bid.get_biding().activity_name
    this.user_name = localStorage.user_name
}

BidSignUp.get_bid_sign_up_info_array = function() {
    return JSON.parse(localStorage.bid_sign_up_info_array || '[]')
}

BidSignUp.set_new_bid_sign_up_info_to_array = function(new_bid_sign_uo_info) {
    var bid_sign_up_info_array = BidSignUp.get_bid_sign_up_info_array()
    bid_sign_up_info_array.unshift(new_bid_sign_uo_info)
    localStorage.bid_sign_up_info_array = JSON.stringify(bid_sign_up_info_array)
}

BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid = function() {
    var bid_sign_up_info_array = BidSignUp.get_bid_sign_up_info_array()
    return _.where(bid_sign_up_info_array, {
        activity_name: ActivityInfo.get_click_activity().name,
        user_name: localStorage.user_name,
        bid_name: Bid.get_click_bid().name
    })
}