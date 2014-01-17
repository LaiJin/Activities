class UserMobileClientInfoShowController < ApplicationController

  PER_PAGE_COUNT = 10
  USER_NUMBER_INIT = 0

  def bid_list_view
    @bids = Bid.where(:user_name => current_user.name, :activity_name => params[:activity_name]).paginate(page: params[:page], :per_page => PER_PAGE_COUNT)
    @count = USER_NUMBER_INIT
    if params[:page]
      @count = Integer(((Integer(params[:page]) - 1) * PER_PAGE_COUNT))
    end
  end

  def activity_sign_up_list_view
  end

  def detailed_once_bid_view
  end

  def statistics_once_bid_view
  end
end
