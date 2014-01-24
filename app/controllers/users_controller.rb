#encoding: utf-8
class UsersController < ApplicationController

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
    user = User.find_by_name(params[:user][:name])
    if user && user.authenticate(params[:user][:password])
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
      data_for_user_weclome(params[:user_name])
      return
    end
    if !current_user || current_user.isAdmin
      redirect_to :login
      return
    end
    data_for_user_weclome(current_user.name)
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
      @activity_sign_ups = paginate(get_activity_sign_ups_data(params[:activity_name]))
      return
    end
    redirect_to :user_welcome
  end

  def detailed_once_bid_view
    if params[:activity_name] && params[:bid_name]
      @bid_sign_ups = get_bid_sign_ups_data(params[:activity_name], params[:bid_name])
      @winner_info  = @bid_sign_ups.find_by(:is_winner => true)
      statistics_bid_sign_ups(@bid_sign_ups)
      return
    end
    redirect_to :bid_list_view
  end

  def synchronous_show_view
    if !current_user
      redirect_to :login
      return
    end
    @biding = Bid.where(:user_name => session[:user_name]).last
    if @biding
      @activity_sign_ups =  get_activity_sign_ups_data(@biding.activity_name)
      @biding_sign_ups = get_bid_sign_ups_data(@biding.activity_name, @biding.name).last(10)
      @winner_info = get_bid_sign_ups_data(@biding.activity_name, @biding.name).find_by(:is_winner => true)
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


  def data_for_user_weclome(user_name)
    session[:user_name] = user_name
    @activity_infos = paginate(ActivityInfo.where(:user_name => session[:user_name]).order("created_at"))
    @biding = Bid.find_by(:user_name => session[:user_name], :status => "start") || Bid.new
  end


  def get_activity_sign_ups_data(biding_activity_name)
    return ActivitySignUp.where(:user_name => session[:user_name],
                                :activity_name => biding_activity_name).order("created_at")
  end


  def get_bid_sign_ups_data(activity_name, bid_name)
    return paginate(BidSignUp.where(:user_name => session[:user_name], :activity_name => activity_name,
                                    :bid_name => bid_name).order("price"))
  end


  def statistics_bid_sign_ups(bid_sign_ups)
    @statistics_bid_sign_ups = paginate(bid_sign_ups.group(:price))
    @price_counts = []
    @statistics_bid_sign_ups.each do |bid_sign_up|
      @price_counts.push({price: bid_sign_up.price, count: @bid_sign_ups.where(:price => bid_sign_up.price).length})
    end
  end

end