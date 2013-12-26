class PhoneController < ApplicationController

  def phone_user_login_view

  end

  def phone_user_login
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to :user_welcome
    else
      flash[:phone_user_login_error] = "用户名或密码错误"
      redirect_to :phone_user_login_view
    end
  end

end
