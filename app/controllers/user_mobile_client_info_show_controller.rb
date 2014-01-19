class UserMobileClientInfoShowController < ApplicationController

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

  end
end
