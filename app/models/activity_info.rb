class ActivityInfo < ActiveRecord::Base
  def self.update_user_activity_info(activity_infos)
    if activity_infos
      activity_infos.each do |activity_info|
        activityInfo = ActivityInfo.new(activity_info)
        activityInfo.save
      end
    end

  end
end
