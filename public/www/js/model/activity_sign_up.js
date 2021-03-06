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
    this.user_name = User.get_current_user_name()
}

ActivitySignUp.get_activity_sign_up_info_array = function() {
    return JSON.parse(localStorage.activity_sign_up_info_array || '[]')
}

ActivitySignUp.set_new_activity_sign_up_info_to_array = function(new_activity_sign_up_info) {
    var activity_sign_up_info_array = ActivitySignUp.get_activity_sign_up_info_array()
    activity_sign_up_info_array.unshift(new_activity_sign_up_info)
    localStorage.activity_sign_up_info_array = JSON.stringify(activity_sign_up_info_array)
}

ActivitySignUp.get_activity_sign_up_infos_for_click_activity = function() {
    var activity_sign_up_infos = ActivitySignUp.get_activity_sign_up_info_array()
    return _.where(activity_sign_up_infos, {
        activity_name: ActivityInfo.get_click_activity().name,
        user_name:User.get_current_user_name()
    })
}

ActivitySignUp.get_activity_sign_up_for_biding_activity = function() {
    var activity_sign_up_infos = ActivitySignUp.get_activity_sign_up_info_array()
    return _.where(activity_sign_up_infos, {
        activity_name: Bid.get_biding().activity_name,
        user_name: User.get_current_user_name()
    })
}

ActivitySignUp.get_activity_sign_up_infos_for_current_user = function() {
    return _.where(ActivitySignUp.get_activity_sign_up_info_array(), {
        user_name: User.get_current_user_name()
    }) || []
}


