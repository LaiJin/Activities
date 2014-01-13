/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-10
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */


//function process_message(json_message) {
//
//         console.log("i can")
//}

process_message = function(json_message) {
    var message = json_message.messages[0]
    if(_.isEmpty(ActivityInfo.get_starting_activity()) || ActivityInfo.get_starting_activity().status == "un_start") {
//        native_accessor.send_sms(message.phone, "活动报名还未开始, 请稍后再试。")
        console.log("活动报名还未开始, 请稍后再试。")
    } else if (ActivityInfo.get_starting_activity().status == "end") {
//        native_accessor.send_sms(message.phone, "抱歉，活动报名已经结束。")
        console.log("抱歉，活动报名已经结束。")
    } else {
        check_message_phone_is_repeat(message)
    }
}

check_message_phone_is_repeat = function(message) {
    var sign_up_infos = ActivitySignUp.get_sign_up_info_array()
    var starting_activity = ActivityInfo.get_starting_activity()
    if(_.find(sign_up_infos, function(sign_up_info) {return sign_up_info.phone == message.phone && sign_up_info.activity_name == starting_activity.name}) == undefined) {
        add_new_sign_up_info(message)
    } else {
//        native_accessor.send_sms(message.phone, "您已经报名成功，请勿重复报名！")
        console.log("您已经报名成功，请勿重复报名！")
    }
}

add_new_sign_up_info = function(message) {
    var sign_up_person_name = get_sign_up_person_name(message.content)
    var new_sign_up_info = new ActivitySignUp(sign_up_person_name, message.phone)
    ActivitySignUp.set_new_sign_up_info_to_array(new_sign_up_info)
    var sig_up_view_element = document.getElementById("sign_up")
    if(sig_up_view_element) {
        var scope = angular.element(sig_up_view_element).scope()
        scope.$apply(function(){
            scope.refresh_activity_sign_up_infos()
        })
    }
    console.log("恭喜，您已经成功报名")
}

get_sign_up_person_name = function(message_content) {

    message_content = trim(message_content)
    if(message_content.substring(0, 2).toUpperCase() == "BM") {
        var sign_up_person_name = message_content.substring(2, message_content.length)
         return trim(sign_up_person_name)
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