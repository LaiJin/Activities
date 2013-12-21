#encoding: utf-8
class UsersController < ApplicationController

  def login
    session[:user] = nil
    session[:answer] = nil
    determine_whether_the_user_login
  end

  def register
    determine_whether_the_user_login
    @user = User.new
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token

      if user.isAdmin
        redirect_to :administrator_welcome
      else
        redirect_to :user_welcome #,:notice => "登录成功"
      end

    else
      flash[:login_error] = "用户名或密码错误"
      redirect_to login_url
    end

  end

  def create
    @user = User.new(user_params)
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to :user_welcome #,:notice => "注册成功"
    else
      render :register
    end
  end

  def reset_password
    if session[:user]
      redirect_to :reset_password_question_and_answer
    end
    determine_whether_the_user_login
  end

  def reset_password_judgment_name
    user = User.find_by_name(params[:name])
    if user
      session[:user] = user
      redirect_to :reset_password_question_and_answer
    else
      flash[:reset_password_error] = "帐号不存在"
      redirect_to :reset_password
    end
  end

  def reset_password_question_and_answer
    if !session[:user]
      redirect_to :reset_password
    else
      @question = User.find(session[:user]).question
    end
    if session[:answer]
      redirect_to :reset_password_setup_new_password
    end
  end

  def reset_password_judgment_answer
    answer = User.find(session[:user]).answer
    if answer == params[:answer]
      session[:answer] = answer
      redirect_to :reset_password_setup_new_password
    else
      flash[:reset_password_error] = "忘记密码答案错误"
      redirect_to :reset_password_question_and_answer
    end
  end

  def reset_password_setup_new_password
    if !session[:answer]
      redirect_to :reset_password_question_and_answer
    end
  end

  def reset_password_update_password
    user = User.find(session[:user])
    if params[:password].empty?
      flash[:reset_password_error] = "密码不能为空"
      redirect_to :reset_password_setup_new_password
    else
      user.password = params[:password]
      user.password_confirmation = params[:password_confirmation]
      #user.update_attributes(:password => params[:password], :password_confirmation => params[:password_confirmation])
      if user.save
        session[:user] = nil
        session[:answer] = nil
        #reset_session
        cookies.permanent[:token] = user.token
        if user.isAdmin
          redirect_to :administrator_welcome
        else
          redirect_to :user_welcome
        end

      else
        flash[:reset_password_error] = user.errors.full_messages.first
        redirect_to :reset_password_setup_new_password
      end

    end

  end

  def user_welcome
    if !current_user
      redirect_to :login
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to login_url #,:notice => "已经退出登录"
  end

  private
  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :question, :answer)
  end

  private
  def determine_whether_the_user_login
    if current_user
      if !current_user.isAdmin
        redirect_to :user_welcome
      else
        redirect_to :administrator_welcome
      end
    end
  end
end
