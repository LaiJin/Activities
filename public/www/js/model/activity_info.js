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
    return JSON.parse(localStorage.activity_array || '[]')
}

ActivityInfo.save_activity_array = function(activity_array) {
    localStorage.activity_array = JSON.stringify(activity_array)
}

ActivityInfo.set_new_activity_to_array = function(new_activity) {
    var activity_array = ActivityInfo.get_activity_array()
    activity_array.unshift(new_activity)
    ActivityInfo.save_activity_array(activity_array)
}

ActivityInfo.set_click_activity = function(activity) {
    localStorage.click_activity = JSON.stringify(activity)
}

ActivityInfo.get_click_activity = function() {
    return JSON.parse(localStorage.click_activity)
}

ActivityInfo.set_starting_activity = function(activity) {
    localStorage.starting_activity = JSON.stringify(activity)
}

ActivityInfo.get_starting_activity = function() {
    return JSON.parse(localStorage.starting_activity || '{}')
}

ActivityInfo.update_activity_status = function(changed_activity, status) {
    var activity_array = ActivityInfo.get_activity_array()
    changed_activity.status = status
    ActivityInfo.set_starting_activity(changed_activity)
    ActivityInfo.set_click_activity(changed_activity)
    _.find(activity_array, function(activity) {return activity.name == changed_activity.name}).status = status
    ActivityInfo.save_activity_array(activity_array)
}

ActivityInfo.check_activity_name_is_same = function(new_activity) {
   return _.some(ActivityInfo.get_activity_array(), function(activity) {return activity.name == new_activity.name })
}

