/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-30
 * Time: 下午5:48
 * To change this template use File | Settings | File Templates.
 */
function Signup(name, phone, activity_name){
    this.name = name;
    this.phone = phone;
    this.activity_name = activity_name;
    this.user_name = localStorage.current_user
}