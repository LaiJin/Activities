class DataSynchronousController < ApplicationController

  skip_before_filter :verify_authenticity_token,:only => [:mobile_client_user_login, :synchronous_all_data,
                                                          :update_synchronous_show_bid_sign_up_info, :add_new_activity_info,
                                                          :add_new_activity_sign_up_info, :add_new_bid,
                                                          :update_biding_status_and_winner_info]
  respond_to :html, :json

  def mobile_client_user_login
    user = User.find_by_name(params[:name])
    respond_to do |format|
      if user && user.authenticate(params[:password])
        format.json {render :json => true}
      else
        format.json {render :json=> false}
      end
    end
  end

  def synchronous_all_data
    update_data(params)
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def add_new_activity_info
    ActivityInfo.create_new_activity_info(params)
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def add_new_activity_sign_up_info
    ActivitySignUp.create_new_activity_sign_up(params)
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def add_new_bid
    Bid.create_new_bid(params)
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def update_synchronous_show_bid_sign_up_info
    BidSignUp.create_new_bid_sign_up(params)
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def update_biding_status_and_winner_info
    Bid.update_biding_status(params)
    if params[:winner_info]
      BidSignUp.update_winner_info(params)
    end
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  private
  def update_data(params)
    ActivityInfo.update_user_activity_infos(params)
    ActivitySignUp.update_user_activity_sign_ups(params)
    Bid.update_user_bids(params)
    BidSignUp.update_user_bid_sign_ups(params)
  end

end
