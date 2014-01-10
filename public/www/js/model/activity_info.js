/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-30
 * Time: 下午4:07
 * To change this template use File | Settings | File Templates.
 */
function ActivityInfo(user_name, name) {
    this.user_name = user_name
    this.name = name
    this.status = "un_start"
}

ActivityInfo.get_activity_array = function() {
//    return JSON.parse(localStorage.getItem("activity_array")) || [];
    return JSON.parse(localStorage.activity_array || '[]')
}

ActivityInfo.set_new_activity_to_array = function(new_activity) {

    var activity_array = ActivityInfo.get_activity_array()
    activity_array.push(new_activity)
    localStorage.activity_array = JSON.stringify(activity_array)
//    localStorage.setItem("activity_name", new_activity.name);
//    localStorage.setItem("activity_array", JSON.stringify(activity_array));
}

ActivityInfo.update_activity_array = function(activity_array) {
//    localStorage.setItem("activity_array", JSON.stringify(activity_array))
    localStorage.activity_array = JSON.stringify(activity_array)
}

ActivityInfo.set_current_activity = function(activity) {
    localStorage.current_activity = JSON.stringify(activity)
}

ActivityInfo.get_current_activity = function() {
    return JSON.parse(localStorage.current_activity)
}
