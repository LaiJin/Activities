/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-30
 * Time: 下午5:48
 * To change this template use File | Settings | File Templates.
 */
function Signup(name, phone){
    this.name = name;
    this.phone = phone;
    this.activity_name = ActivityInfo.get_current_activity().name;
    this.user_name = localStorage.current_user
}

Signup.get_sign_up_info_array = function() {
    return JSON.parse(localStorage.sign_up_info_array || '[]')
}

Signup.set_new_sign_up_info_to_array = function(new_sign_up_info) {
    var sign_up_info_array = Signup.get_sign_up_info_array()
    sign_up_info_array.push(new_sign_up_info)
    localStorage.sign_up_info_array = JSON.stringify(sign_up_info_array)
}

Signup.check_sign_up_is_same = function() {

}

