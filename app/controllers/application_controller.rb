#encoding: utf-8
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
        redirect_to :administrator_welcome_view
      end
    end
  end

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :question, :answer)
  end

  def reset_session_of_user_and_answer
    session[:user]   = nil
    session[:answer] = nil
  end

  #可用于View中
  helper_method :current_user

end
