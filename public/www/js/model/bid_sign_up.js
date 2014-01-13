/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-13
 * Time: 下午2:52
 * To change this template use File | Settings | File Templates.
 */
function BidSignUp(price,phone,name) {
    this.name = name
    this.phone = phone
    this.price = price
    this.activity_name = Bid.get_biding().activity_name
    this.user_name = localStorage.user_name
}


BidSignUp.set_new_bid_sign_up_info_to_array = function(new_bid_sign_uo_info) {

}