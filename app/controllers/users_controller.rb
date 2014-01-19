#encoding: utf-8
class UsersController < ApplicationController

  PER_PAGE_COUNT = 10
  USER_NUMBER_INIT = 0

  skip_before_filter :verify_authenticity_token,:only => [:mobile_client_user_login, :synchronous_data]

  def login
    reset_session_of_user_and_answer
    if current_user
      current_user_is_admin
    end
  end

  def register
    reset_session_of_user_and_answer
    if current_user
      redirect_to :login
    else
      @user =User.new
    end
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      #current_user_is_admin
      redirect_to :user_welcome
    else
      flash[:login_error] = "用户名或密码错误"
      redirect_to login_url
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to :user_welcome
    else
      render :register
    end
  end

  def user_welcome
    if !current_user || current_user.isAdmin
      redirect_to :login
    else
      @activity_infos = ActivityInfo.where(:user_name => current_user.name).order("created_at").paginate(page:params[:page],:per_page => PER_PAGE_COUNT)
      @biding = Bid.where(:user_name => current_user.name, :status => "start").first
      @count = USER_NUMBER_INIT
      if params[:page]
        @count = Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
      end
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to login_url
  end

  def mobile_client_user_login
    user = User.find_by_name(params[:name])
    respond_to do |format|
      if user && user.authenticate(params[:password])
        format.json {render :json=> true}
      else
        format.json {render :json=> false}
      end
    end
  end

  def synchronous_data
    update_activity_infos(params)
    respond_to do |format|
      format.json {render :json => true}
      #if update_activity_infos(params)
      #  format.json {render :json => true}
      #else
      #  format.json {render :json => false}
      #end
    end
  end

  private
  def current_user_is_admin
    if current_user.isAdmin
      redirect_to :administrator_welcome_view
    else
      redirect_to :user_welcome
    end
  end

  private
  def update_activity_infos(parmas)
    #return ActivityInfo.update_user_activity_infos(parmas) && ActivitySignUp.update_user_activity_sign_ups(parmas) && Bid.update_user_bids(parmas) && BidSignUp.update_user_bid_sign_ups(parmas)
    ActivityInfo.update_user_activity_infos(parmas)
    ActivitySignUp.update_user_activity_sign_ups(parmas)
    Bid.update_user_bids(parmas)
    BidSignUp.update_user_bid_sign_ups(parmas)
  end

end