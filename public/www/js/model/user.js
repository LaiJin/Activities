/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-17
 * Time: 上午9:53
 * To change this template use File | Settings | File Templates.
 */
function User(user_name) {
    this.name = user_name
}

User.set_current_user_name = function(user_name) {
    localStorage.current_user_name = user_name
}

User.get_current_user_name  = function() {
    return localStorage.current_user_name
}