#encoding: utf-8
class AdministratorController < ApplicationController

  PER_PAGE_COUNT = 10
  USER_NUMBER_INIT = 0

  def administrator_welcome_view
    session[:updated_user_id] = nil
    if !current_user || !current_user.isAdmin
      redirect_to :login
    else
      @users = User.where(:isAdmin=>false).order("created_at").paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||User.new
      @count = USER_NUMBER_INIT
      if params[:page]
        @count=Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
      end
    end
  end

  def edit_user_view
    if params[:updated_user_id]
    session[:updated_user_id] = params[:updated_user_id]
    end

    if session[:updated_user_id]
    @user_name = User.find(session[:updated_user_id]).name
    else
      redirect_to :administrator_welcome_view
    end
  end

  def add_user_view
    if !current_user || !current_user.isAdmin
      redirect_to :login
    else
      @user = User.new
    end
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
    else
      render :add_user_view
    end

  end

  def update_user_password
    user = User.find(session[:updated_user_id])
    user.password = params[:password]
    user.password_confirmation = params[:password_confirmation]
    if user.save
      session[:updated_user_id] = nil
      redirect_to :administrator_welcome_view
    else
      flash[:reset_password_error] = user.errors.full_messages.first
      redirect_to :edit_user_view
    end
  end


end
