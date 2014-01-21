#encoding: utf-8
class UsersController < ApplicationController

  PER_PAGE_COUNT = 10
  USER_NUMBER_INIT = 0

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
      return
    end
    @user =User.new
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to :user_welcome
      return
    end
    flash[:login_error] = "用户名或密码错误"
    redirect_to login_url
  end

  def create
    @user = User.new(user_params)
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to :user_welcome
      return
    end
    render :register
  end

  def user_welcome
    if !current_user
      redirect_to :login
      return
    end

    if current_user.isAdmin && params[:user_name]
      session[:user_name] = params[:user_name]
      @activity_infos = paginate(ActivityInfo.where(:user_name => session[:user_name]).order("created_at"))
      @biding = Bid.where(:user_name => session[:user_name], :status => "start").first || Bid.new
      @count = USER_NUMBER_INIT
      return
    end

    if !current_user || current_user.isAdmin
      redirect_to :login
    else
      session[:user_name] = current_user.name
      @activity_infos = paginate(ActivityInfo.where(:user_name => current_user.name).order("created_at"))
      @biding = Bid.where(:user_name => current_user.name, :status => "start").first || Bid.new
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to login_url
  end

  def bid_list_view
    if params[:activity_name]
      @bids = paginate(Bid.where(:user_name => session[:user_name],
                                 :activity_name => params[:activity_name]).order("created_at"))
      return
    end
    redirect_to :user_welcome
  end

  def activity_sign_up_list_view
    if params[:activity_name]
      @activity_sign_ups = paginate(ActivitySignUp.where(:user_name => session[:user_name],
                                                         :activity_name => params[:activity_name]).order("created_at"))
      return
    end
    redirect_to :user_welcome
  end

  def detailed_once_bid_view
    if params[:activity_name] && params[:bid_name]
      @bid_sign_ups = paginate(BidSignUp.where(:user_name => session[:user_name],
                                               :activity_name => params[:activity_name],
                                               :bid_name => params[:bid_name]).order("price"))
      @winner_info = @bid_sign_ups.where(:is_winner => true).first
      @statistics_bid_sign_ups = paginate(@bid_sign_ups.group(:price))
      @price_counts = []
      @statistics_bid_sign_ups.each do |bid_sign_up|
        @price_counts.push({price: bid_sign_up.price, count: @bid_sign_ups.where(:price => bid_sign_up.price).length})
      end
      return
    end
    redirect_to :bid_list_view
  end

  def synchronous_show_view
    @biding = Bid.where(:user_name => session[:user_name]).last
    if @biding
      @activity_sign_ups_lenght = ActivitySignUp.where(:user_name => session[:user_name],
                                                       :activity_name => @biding.activity_name).length
      @biding_sign_ups = paginate(BidSignUp.where(:user_name => session[:user_name],
                                                  :activity_name => @biding.activity_name,
                                                  :bid_name => @biding.name).order("price"))
      @winner_info = @biding_sign_ups.where(:is_winner => true).first
      return
    end
    redirect_to :user_welcome
  end

  private
  def current_user_is_admin
    if current_user.isAdmin
      redirect_to :administrator_welcome_view
      return
    end
    redirect_to :user_welcome
  end

  def paginate(array)
    @count = USER_NUMBER_INIT
    if params[:page]
      @count = Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
    end
    return  array.paginate(page:params[:page],:per_page => PER_PAGE_COUNT)
  end

end