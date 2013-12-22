#encoding: utf-8
class UsersController < ApplicationController

  def login
    session[:user] = nil
    session[:answer] = nil
    determine_whether_the_user_login
  end

  def register
    session[:user] = nil
    session[:answer] = nil
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

end
