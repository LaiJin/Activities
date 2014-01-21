class ActivityInfo < ActiveRecord::Base

  def self.update_user_activity_infos(params)
    #ActivityInfo.transaction do
      ActivityInfo.delete_all(:user_name => params[:user_name])
      activity_infos = params[:activity_infos]
      activity_infos.each do |activity_info|
        activityInfo = ActivityInfo.new(activity_info)
        activityInfo.save
      #end
    end
  end

  def self.create_new_activity_info(params)
    new_activities = params[:new_activities]
    new_activity = ActivityInfo.new(new_activities.first)
    new_activity.save
  end

end
