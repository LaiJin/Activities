class ActivitySignUp < ActiveRecord::Base

  def self.update_user_activity_sign_ups(params)
    #ActivitySign_up.transaction do
    ActivitySignUp.delete_all(:user_name => params[:user_name])
    activity_sign_ups = params[:activity_sign_ups]
    activity_sign_ups.each do |activity_sign_up|
      activity_sign_up_info = ActivitySignUp.new(activity_sign_up)
      activity_sign_up_info.save
    end
    #end
  end

  def self.create_new_activity_sign_up(params)
    new_activity_sign_ups = params[:new_activity_sign_ups]
    new_activity_sign_up = ActivitySignUp.new(new_activity_sign_ups.first)
    new_activity_sign_up.save
  end

end
