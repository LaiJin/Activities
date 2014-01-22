#encoding: utf-8
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end

  PER_PAGE_COUNT = 10
  NUMBER_INIT = 0

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :question, :answer)
  end

  def paginate(array)
    @count = NUMBER_INIT
    if params[:page]
      @count = Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
    end
    return  array.paginate(page:params[:page],:per_page => PER_PAGE_COUNT)
  end

  def reset_session_of_user_and_answer
    session[:user]   = nil
    session[:answer] = nil
  end

  #可用于View中
  helper_method :current_user

end
