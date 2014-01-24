#encoding: utf-8
class AdministratorController < ApplicationController

  def administrator_welcome_view
    session[:updated_user_id] = nil
    if !current_user || !current_user.isAdmin
      redirect_to :login
      return
    end
    @users = paginate(User.where(:isAdmin => false).order("created_at"))
  end

  def edit_user_view
    if params[:updated_user_id]
      session[:updated_user_id] = params[:updated_user_id]
    end
    if session[:updated_user_id]
      @user_name = User.find(session[:updated_user_id]).name
      return
    end
    redirect_to :administrator_welcome_view
  end

  def add_user_view
    if !current_user || !current_user.isAdmin
      redirect_to :login
      return
    end
    @user = User.new
  end

  def delete_user
    User.delete(params[:deleted_user_id])
    params[:deleted_user_id] = nil
    redirect_to :administrator_welcome_view
  end

  def create_user
    @user = User.new(user_params)
    if @user.save
      redirect_to :administrator_welcome_view
      return
    end
    render :add_user_view
  end

  def update_user_password
    user = User.find(session[:updated_user_id])
    user.password = params[:user][:password]
    user.password_confirmation = params[:user][:password_confirmation]
    if user.save
      session[:updated_user_id] = nil
      redirect_to :administrator_welcome_view
      return
    end
    flash[:reset_password_error] = user.errors.full_messages.first
    redirect_to :edit_user_view
  end

end
