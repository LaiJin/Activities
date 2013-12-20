class AdministratorController < ApplicationController

  def administrator_welcome
    if !current_user
      redirect_to :login
    end
  end

  def edit_user
  end

  def add_user

  end
end

