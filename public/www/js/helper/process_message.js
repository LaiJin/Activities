/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-10
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */


function process_message(json_message) {
    var message = json_message.messages[0]
    message.content = trim(message.content)

    if(message.content.substring(0, 2).toUpperCase() == "BM") {
         process_activity_sign_up_message()
    }

    if(message.content.substring(0, 2).toUpperCase() == "JJ") {
        process_bid_sign_up_message()
    }

    function process_activity_sign_up_message() {
        if(ActivityInfo.get_starting_activity().status == "un_start") {
            console.log("活动报名还未开始, 请稍后再试。")
        }

        if(ActivityInfo.get_starting_activity().status == "end") {
            console.log("抱歉，活动报名已经结束。")
        }

        if(ActivityInfo.get_starting_activity().status == "start") {
            var activity_sign_up_infos = ActivitySignUp.get_activity_sign_up_info_array()
            var starting_activity = ActivityInfo.get_starting_activity()
            var repeatedly_activity_sign_up_info = _.find(activity_sign_up_infos, function(activity_sign_up_info) {
                return activity_sign_up_info.phone == message.phone && activity_sign_up_info.activity_name == starting_activity.name})
            if(repeatedly_activity_sign_up_info == undefined) {
                var activity_sign_up_person_name = trim(message.content.substring(2, message.content.length))
                var new_activity_sign_up_info = new ActivitySignUp(activity_sign_up_person_name, message.phone)
                ActivitySignUp.set_new_activity_sign_up_info_to_array(new_activity_sign_up_info)
                var activity_sig_up_view_element = document.getElementById("activity_sign_up")
                if(activity_sig_up_view_element) {
                    var scope = angular.element(activity_sig_up_view_element).scope()
                    scope.$apply(function(){
                        scope.refresh_activity_sign_up_infos()
                    })
                }
                console.log("恭喜，您已经成功报名")
            } else {
                console.log("您已经报名成功，请勿重复报名！")
            }
        }

    }

    function process_bid_sign_up_message() {

    }
}

function trim(string) {      //删除左右两端的空格
    return string.replace(/(^\s*)|(\s*$)/g, "")
}

function left_trim(string) { //删除左边的空格
    return string.replace(/\b(0+)/gi,"")
//    return string.replace(/(^\s*)/g,"")

}

function right_trim(string) {  //删除右边的空格
    return string.replace(/(\s*$)/g,"");
}