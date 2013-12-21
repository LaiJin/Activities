class AdministratorController < ApplicationController

  PER_PAGE_COUNT = 10
  def administrator_welcome
    if !current_user
      redirect_to :login
    end
    @users = User.where(:isAdmin=>false).order("created_at").paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||User.new
    @count = 0
  end

  def edit_user
  end

  def add_user

  end
end
