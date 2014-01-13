/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午2:29
 * To change this template use File | Settings | File Templates.
 */
function Bid(name) {
    this.name = name
    this.status = "start"
    this.user_name = localStorage.user_name
    this.activity_name = ActivityInfo.get_click_activity().name
}

Bid.get_bid_array = function() {
    return JSON.parse(localStorage.bid_array || '[]' )
}

Bid.set_new_bid_to_array = function(new_bid) {
    var bid_array = Bid.get_bid_array()
    bid_array.unshift(new_bid)
    localStorage.bid_array = JSON.stringify(bid_array)
}

Bid.update_bid_array = function(bid_array) {
    localStorage.bid_array = JSON.stringify(bid_array)
}

Bid.get_click_bid = function() {
    return JSON.parse(localStorage.click_bid)
}

Bid.set_click_bid = function(click_bid) {
    localStorage.click_bid = JSON.stringify(click_bid)
}

Bid.set_biding = function(biding) {
    localStorage.biding = JSON.stringify(biding)
}

Bid.get_biding = function() {
    return JSON.parse(localStorage.biding || '{}')
}

Bid.get_bids_for_current_click_activity = function() {
    var bids = Bid.get_bid_array()
    return _.where(bids, {activity_name: ActivityInfo.get_click_activity().name, user_name: localStorage.user_name})
}

