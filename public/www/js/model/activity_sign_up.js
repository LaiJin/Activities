/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-30
 * Time: 下午5:48
 * To change this template use File | Settings | File Templates.
 */
function ActivitySignUp(name, phone){
    this.name = name;
    this.phone = phone;
    this.activity_name = ActivityInfo.get_starting_activity().name;
    this.user_name = localStorage.current_user
}

ActivitySignUp.get_activity_sign_up_info_array = function() {
    return JSON.parse(localStorage.sign_up_info_array || '[]')
}

ActivitySignUp.set_new_activity_sign_up_info_to_array = function(new_sign_up_info) {
    var sign_up_info_array = ActivitySignUp.get_activity_sign_up_info_array()
    sign_up_info_array.unshift(new_sign_up_info)
    localStorage.sign_up_info_array = JSON.stringify(sign_up_info_array)
}

ActivitySignUp.get_activity_sign_up_infos_for_click_activity = function() {
    var activity_sign_up_infos = ActivitySignUp.get_activity_sign_up_info_array()
    return _.where(activity_sign_up_infos, {activity_name: ActivityInfo.get_click_activity().name, user_name:localStorage.current_user}) || {}
}


