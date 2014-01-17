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
    this.user_name = User.get_current_user_name()
    this.activity_name = ActivityInfo.get_click_activity().name
}

Bid.create_new_bid = function() {
    var bids = Bid.get_bids_for_current_click_activity()
    var new_bid = new Bid("竞价" + (parseInt(bids.length) + 1))
    Bid.set_new_bid_to_array(new_bid)
    Bid.set_click_bid(new_bid)
    Bid.set_biding(new_bid)
}

Bid.get_bid_array = function() {
    return JSON.parse(localStorage.bid_array || '[]' )
}

Bid.set_new_bid_to_array = function(new_bid) {
    var bid_array = Bid.get_bid_array()
    bid_array.unshift(new_bid)
    Bid.save_bid_array(bid_array)
}

Bid.save_bid_array = function(bid_array) {
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
    return _.where(bids, {
        activity_name: ActivityInfo.get_click_activity().name,
        user_name: User.get_current_user_name()
    }) || []
}

Bid.update_bid_status = function() {
    var biding = Bid.get_biding()
    var bids = Bid.get_bid_array()
    biding.status = "end"
    Bid.set_biding(biding)
    Bid.set_click_bid(biding)
    _.find(bids, function(bid) {return bid.name == bid.name}).status = "end"
    Bid.save_bid_array(bids)
}



