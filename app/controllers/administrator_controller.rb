#encoding: utf-8
class AdministratorController < ApplicationController

  PER_PAGE_COUNT = 10
  USER_NUMBER = 0

  def administrator_welcome
    session[:updated_user_id] = nil
    if !current_user
      redirect_to :login
    else
      @users = User.where(:isAdmin=>false).order("created_at").paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||User.new
      @count = 0
      if params[:page]
        @count=Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
      end
    end
  end

  def edit_user
    if params[:updated_user_id]
    session[:updated_user_id] = params[:updated_user_id]
    end
    if session[:updated_user_id]
    @user_name = User.find(session[:updated_user_id]).name
    else
      redirect_to :administrator_welcome
    end
  end

  def add_user
    @user = User.new
  end

  def delete_user
    User.delete(params[:deleted_user_id])
    params[:deleted_user_id] = nil
    redirect_to :administrator_welcome
  end

  def create_user
    @user = User.new(user_params)
    if @user.save
      redirect_to :administrator_welcome
    else
      render :add_user
    end

  end

  def update_user_password
    user = User.find(session[:updated_user_id])
    user.password = params[:password]
    user.password_confirmation = params[:password_confirmation]
    if user.save
      session[:updated_user_id] = nil
      redirect_to :administrator_welcome
    else
      flash[:reset_password_error] = user.errors.full_messages.first
      redirect_to :edit_user
    end

  end

  private
  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :question, :answer)
  end

end
