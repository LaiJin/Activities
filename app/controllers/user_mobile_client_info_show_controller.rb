#encoding: utf-8
class UserMobileClientInfoShowController < ApplicationController

  skip_before_filter :verify_authenticity_token,:only => [:update_synchronous_show_bid_sign_up_info]

  PER_PAGE_COUNT = 10
  USER_NUMBER_INIT = 0

  def bid_list_view
    @bids = Bid.where(:user_name => current_user.name, :activity_name => params[:activity_name]).order("created_at").paginate(page: params[:page], :per_page => PER_PAGE_COUNT)
    @count = USER_NUMBER_INIT
    if params[:page]
      @count = Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
    end
  end

  def activity_sign_up_list_view
    @activity_sign_ups = ActivitySignUp.where(:user_name => current_user.name, :activity_name => params[:activity_name]).order("created_at").paginate(page: params[:page], :per_page => PER_PAGE_COUNT)
    @count = USER_NUMBER_INIT
    if params[:page]
      @count = Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
    end
  end

  def detailed_once_bid_view
    @bid_sign_ups = BidSignUp.where(:user_name => current_user.name, :activity_name => params[:activity_name], :bid_name => params[:bid_name]).order("price").paginate(page: params[:page], :per_page => PER_PAGE_COUNT)
    @winner_info = @bid_sign_ups.where(:is_winner => true).first
    @statistics_bid_sign_ups = @bid_sign_ups.group(:price).paginate(page: params[:page], :per_page => PER_PAGE_COUNT)
    @price_counts = []
    @statistics_bid_sign_ups.each do |bid_sign_up|
      @price_counts.push({price: bid_sign_up.price, count: @bid_sign_ups.where(:price => bid_sign_up.price).length})
    end
    @count = USER_NUMBER_INIT
    if params[:page]
      @count = Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
    end
  end

  def synchronous_show_view
    @activity_sign_ups = ActivitySignUp.where(:user_name => current_user.name, :activity_name => params[:biding_activity_name])
    @biding_sign_ups = BidSignUp.where(:user_name => current_user.name, :activity_name => params[:biding_activity_name], :bid_name => params[:biding_name])

  end

  def update_synchronous_show_bid_sign_up_info

    new_bid_sign_ups = params[:new_bid_sign_up]
    new_bid_sign_up = BidSignUp.new(new_bid_sign_ups.first)
    #new_bid_sign_up.name = params[:new_bid_sign_up][:name]
    #new_bid_sign_up.phone = params[:new_bid_sign_up][:phone]
    #new_bid_sign_up.price = params[:new_bid_sign_up][:price]
    #new_bid_sign_up.is_winner = params[:new_bid_sign_up][:is_winner]
    #new_bid_sign_up.bid_name = params[:new_bid_sign_up][:bid_name]
    #new_bid_sign_up.activity_name = params[:new_bid_sign_up][:activity_name]
    #new_bid_sign_up.user_name = params[:new_bid_sign_up][:user_name]
    new_bid_sign_up.save
    respond_to do |format|
      format.json {render :json => true}
    end
  end

end
