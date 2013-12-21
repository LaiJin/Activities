class AdministratorController < ApplicationController

  PER_PAGE_COUNT = 10
  USER_NUMBER = 0

  def administrator_welcome
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
    @user_name = User.find_by_id(params[:updated_user_id]).name
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

  end

  private
  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :question, :answer)
  end

end
