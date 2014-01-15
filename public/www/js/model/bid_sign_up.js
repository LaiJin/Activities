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
    this.is_winner = false
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
    BidSignUp.save_bid_sign_up_info_array(bid_sign_up_info_array)
}

BidSignUp.save_bid_sign_up_info_array = function(bid_sign_up_info_array) {
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

BidSignUp.analysis_out_winner_for_current_activity_biding = function() {
    var bid_sign_up_infos_for_current_bid = BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid()
    var group_bid_sign_up_infos_by_price =  _.groupBy(bid_sign_up_infos_for_current_bid, function(bid_sign_up_info) {return bid_sign_up_info.price})
    var winner_bid_sign_up_info_for_current_bid = _.first(_.find(group_bid_sign_up_infos_by_price, function(bid_sign_up_info) {return _.size(bid_sign_up_info) == 1}))
    if(winner_bid_sign_up_info_for_current_bid) {
        BidSignUp.update_winner_bid_sign_up_info_property_is_winner(winner_bid_sign_up_info_for_current_bid)
    }
}

BidSignUp.update_winner_bid_sign_up_info_property_is_winner = function(winner_info) {
    var bid_sign_up_info_array = BidSignUp.get_bid_sign_up_info_array()
    _.find(bid_sign_up_info_array, function(bid_sign_up_info) {
        return bid_sign_up_info.activity_name == winner_info.activity_name
            && bid_sign_up_info.bid_name == winner_info.bid_name
            && bid_sign_up_info.price == winner_info.price }).is_winner = true
    BidSignUp.save_bid_sign_up_info_array(bid_sign_up_info_array)
}

BidSignUp.get_winner_for_current_bid = function() {
    var bid_sign_up_infos_for_current_bid = BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid()
    return _.find(bid_sign_up_infos_for_current_bid, function(bid_sign_up_info){
        return bid_sign_up_info.is_winner == true
    })
}

BidSignUp.statistics_bid_price_count_for_current_activity_bid = function() {
    var statistics_price_count = _.countBy(BidSignUp.get_bid_sign_up_infos_for_current_activity_clicked_bid(), function(num) {return num.price})
    var statistics_results = []
    for(var key in statistics_price_count) {
        var price_count = {price: key, count: statistics_price_count[key]}
        statistics_results.push(price_count)
    }
    return statistics_results
}
