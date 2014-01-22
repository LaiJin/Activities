/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-10
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */

var process_all_message = {
    inject_synchronous_new_bid_sign_up: function(function_name) {
        this.synchronous_new_bid_sign_up = function_name
    },

    inject_synchronous_new_activity_sign_up: function(function_name) {
       this.synchronous_new_activity_bid_sign_up = function_name
    },

    process_message: function(json_message) {
        var message = json_message.messages[0]
        message.content = trim(message.content)
        var fore_two_string = message.content.substring(0, 2).toUpperCase()

        judge_message(this.synchronous_new_bid_sign_up, this.synchronous_new_activity_bid_sign_up)

        function judge_message(synchronous_new_bid_sign_up, synchronous_new_activity_sign_up) {
            var judge_message = {
                BM: function() {
                    process_activity_sign_up_message(synchronous_new_activity_sign_up)
                },

                JJ: function() {
                    process_bid_sign_up_message(synchronous_new_bid_sign_up)
                }
            }
            if(judge_message[fore_two_string]) {
                judge_message[fore_two_string]()
                return
            }
            prompt_message_format()
        }

        function prompt_message_format() {
            if(ActivityInfo.get_starting_activity().status == "start") {
                console.log("活动报名格式不正确。请按格式：“BM ＋ 您的姓名” 发送短信。")
                return
            }
            if(Bid.get_biding().status == "start") {
                console.log("竞价报名格式不正确。请按格式：“JJ ＋ 您的出价” 发送短信。")
                return
            }
            console.log("当前没有活动报名和竞价报名, 短信无效！")
        }

        function process_activity_sign_up_message(synchronous_new_activity_sign_up) {

            judge_activity_status()

            function judge_activity_status() {

                var judge_activity_status = {
                    un_start: function() {
                        console.log("活动报名还未开始, 请稍后再试。")
                    },

                    end: function() {
                        console.log("抱歉，活动报名已经结束。")
                    },

                    start: function() {
                        process_message_when_activity_status_start()
                    }
                }
                judge_activity_status[ActivityInfo.get_starting_activity().status]()
            }

            function process_message_when_activity_status_start() {
                var repeat_activity_sign_up_info = find_repeat_activity_sign_up()
                if(repeat_activity_sign_up_info == undefined) {
                    add_new_activity_sign_up_info()
                    return
                }
                console.log("您已经活动报名成功，请勿重复进行活动报名！")
            }

            function find_repeat_activity_sign_up() {
                var activity_sign_up_infos = ActivitySignUp.get_activity_sign_up_info_array()
                var starting_activity = ActivityInfo.get_starting_activity()
                return _.find(activity_sign_up_infos, function(activity_sign_up_info) {
                    return activity_sign_up_info.phone == message.phone
                        && activity_sign_up_info.activity_name == starting_activity.name
                })
            }

            function add_new_activity_sign_up_info() {
                var activity_sign_up_person_name = trim_price_or_person_name()
                var new_activity_sign_up_info = new ActivitySignUp(activity_sign_up_person_name, message.phone)
                ActivitySignUp.set_new_activity_sign_up_info_to_array(new_activity_sign_up_info)
                synchronous_new_activity_sign_up(new_activity_sign_up_info)
                refresh_sign_up_info("activity_sign_up")
                console.log("恭喜，您活动报名成功。")
            }

        }

        function process_bid_sign_up_message(synchronous_new_bid_sign_up) {

            judge_bid_status()

            function judge_bid_status() {

                var judge_bid_status = {
                    start: function() {
                        process_message_when_bid_status_start()
                    },

                    end: function() {
                        console.log("抱歉，竞价报名已经结束。")
                    }
                }
                if(judge_bid_status[Bid.get_biding().status]) {
                    judge_bid_status[Bid.get_biding().status]()
                    return
                }
                console.log("竞价报名还未开始, 请稍后再试。")
            }

            function process_message_when_bid_status_start() {
                check_whether_event_registration()
            }

            function check_whether_event_registration() {
                var activity_sign_up_info = _.find(ActivitySignUp.get_activity_sign_up_for_biding_activity(), function(activity_sign_up_info) {
                    return activity_sign_up_info.phone  == message.phone
                })
                if(activity_sign_up_info == undefined) {
                    console.log("您没有参加活动报名，无法进行竞价报名！")
                    return
                }
                find_repeat_bid_sign_up_info(activity_sign_up_info)
            }

            function find_repeat_bid_sign_up_info(activity_sign_up_info) {
                var bid_sign_up_infos = BidSignUp.get_bid_sign_up_info_array()
                var biding = Bid.get_biding()
                var repeat_bid_sign_up_info = _.find(bid_sign_up_infos, function(bid_sign_up_info) {
                    return bid_sign_up_info.phone == message.phone
                        && bid_sign_up_info.activity_name == biding.activity_name
                        && bid_sign_up_info.bid_name == biding.name
                })
                if(repeat_bid_sign_up_info == undefined) {
                    add_new_bid_sign_up_info(activity_sign_up_info)
                    return
                }
                console.log("您已经竞价报名成功，请勿重复进行竞价报名！")
            }

            function add_new_bid_sign_up_info(activity_sign_up_info) {
                var bid_sign_up_price = trim_price_or_person_name()
                if(!isNaN(bid_sign_up_price)) {
                    var new_bid_sign_up_info = new BidSignUp(activity_sign_up_info.name, message.phone, bid_sign_up_price)
                    BidSignUp.set_new_bid_sign_up_info_to_array(new_bid_sign_up_info)
                    synchronous_new_bid_sign_up(new_bid_sign_up_info)
                    refresh_sign_up_info("bid_sign_up")
                    console.log("恭喜，您竞价报名成功。")
                    return
                }
                console.log("价钱必须为数字！")
            }
        }

        function trim_price_or_person_name() {
            return trim(message.content.substring(2, message.content.length))
        }

        function refresh_sign_up_info(view_id) {
            var sign_up_view_element = document.getElementById(view_id)
            if(sign_up_view_element) {
                var scope = angular.element(sign_up_view_element).scope()
                scope.$apply(function() {
                    scope.refresh_sign_up_infos()
                })
            }
        }

    }

}

function trim(string) {      //删除左右两端的空格
    return string.replace(/(^\s*)|(\s*$)/g, "")
}

function left_trim(string) {
    return string.replace(/\b(0+)/gi,"")
//    return string.replace(/(^\s*)/g,"")

}

function right_trim(string) {  //删除右边的空格
    return string.replace(/(\s*$)/g,"");
}