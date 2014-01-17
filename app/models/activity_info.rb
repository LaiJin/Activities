class ActivityInfo < ActiveRecord::Base

  def self.update_user_activity_infos(params)
    ActivityInfo.delete_all(:user_name => params[:user_name])
    activity_infos = params[:activity_infos]
      activity_infos.each do |activity_info|
        activityInfo = ActivityInfo.new(activity_info)
        activityInfo.save
    end
  end
end
