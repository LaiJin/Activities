/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 13-12-30
 * Time: 下午4:07
 * To change this template use File | Settings | File Templates.
 */
function ActivityInfo(user_name, name) {
    this.user_name = user_name;
    this.name = name;
    this.status = "un_start"
}

ActivityInfo.get_activity_array=function(){
    return JSON.parse(localStorage.activity_array);
}


ActivityInfo.get_current_activity_array=function(){
    var activity_array=ActivityInfo.get_activity_array();
    return _.where(activity_array,{user_name: localStorage.current_user})||[];
}

ActivityInfo.set_activity_array=function(activity_array){
    localStorage.activity_array=JSON.stringify(activity_array)
}

ActivityInfo.set_current_activity=function(activity){
    localStorage.current_activity=JSON.stringify(activity)
}

ActivityInfo.get_current_activity=function(){
    return JSON.parse(localStorage.current_activity);
}