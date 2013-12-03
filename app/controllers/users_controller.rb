#encoding: utf-8
class UsersController < ApplicationController

  def login
  end

  def register
    @user = User.new
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to welcome_url #,:notice => "登录成功"
    else
      flash[:error] = "用户名或密码错误"
      redirect_to :root
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to :welcome #,:notice => "注册成功"
    else
      render :register
    end
  end

  def reset_password
  end

  def welcome
  end

  def logout
    cookies.delete(:token)
    redirect_to root_url #,:notice => "已经退出登录"
  end

  private

  def user_params
    #params.require(:user).permit(:name, :email, :password, :salt, :encrypted_password)
    params.require(:user).permit(:name, :password, :password_confirmation, :question, :answer)
  end

end
