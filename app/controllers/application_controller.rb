class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end

  def determine_whether_the_user_login
    if current_user
      if !current_user.isAdmin
        redirect_to :user_welcome
      else
        redirect_to :administrator_welcome
      end
    end
  end

  helper_method :current_user, :determine_whether_the_user_login

end
