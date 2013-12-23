class ResetPasswordController < ApplicationController

  def check_user_name_view
    if session[:user]
      redirect_to :check_user_answer_view
    end
    if current_user
     redirect_to :login
    end
  end

  def check_user_answer_view
    if !session[:user]
      redirect_to :check_user_name_view
    else
      @question = User.find(session[:user]).question
    end
    if session[:answer]
      redirect_to :setup_user_new_password_view
    end
  end

  def setup_user_new_password_view
    if !session[:answer]
      redirect_to :check_user_answer_view
    end
  end

  def check_user_name
    user = User.find_by_name(params[:name])
    if user
      session[:user] = user
      redirect_to :check_user_answer_view
    else
      flash[:reset_password_error] = "帐号不存在"
      redirect_to :check_user_name_view
    end
  end

  def check_user_answer
    answer = User.find(session[:user]).answer
    if answer == params[:answer]
      session[:answer] = answer
      redirect_to :setup_user_new_password_view
    else
      flash[:reset_password_error] = "忘记密码答案错误"
      redirect_to :check_user_answer_view
    end
  end

  def setup_user_new_password
    user = User.find(session[:user])
    if params[:password].empty?
      flash[:reset_password_error] = "密码不能为空"
      redirect_to :setup_user_new_password_view
    else
      user.password = params[:password]
      user.password_confirmation = params[:password_confirmation]
      if user.save
        reset_session_of_user_and_answer
        cookies.permanent[:token] = user.token
        redirect_to :user_welcome
      else
        flash[:reset_password_error] = user.errors.full_messages.first
        redirect_to :setup_user_new_password_view
      end
    end
  end
end
