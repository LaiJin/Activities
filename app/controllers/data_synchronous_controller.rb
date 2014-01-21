class DataSynchronousController < ApplicationController

  skip_before_filter :verify_authenticity_token,:only => [:mobile_client_user_login, :synchronous_all_data,
                                                          :update_synchronous_show_bid_sign_up_info, :add_new_activity_info,
                                                          :add_new_activity_sign_up_info, :add_new_bid,
                                                          :update_biding_status_and_winner_info]

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

  def synchronous_all_data
    update_data(params)
    respond_to do |format|
      format.json {render :json => true}
      #if update_activity_infos(params)
      #  format.json {render :json => true}
      #else
      #  format.json {render :json => false}
      #end
    end
  end


  def update_synchronous_show_bid_sign_up_info
    new_bid_sign_ups = params[:new_bid_sign_ups]
    new_bid_sign_up = BidSignUp.new(new_bid_sign_ups.first)
    new_bid_sign_up.save
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def add_new_activity_info
    new_activities = params[:new_activities]
    new_activity = ActivityInfo.new(new_activities.first)
    new_activity.save
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def add_new_activity_sign_up_info
    new_activity_sign_ups = params[:new_activity_sign_ups]
    new_activity_sign_up = ActivitySignUp.new(new_activity_sign_ups.first)
    new_activity_sign_up.save
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def add_new_bid
    new_bids = params[:new_bids]
    new_bid  = Bid.new(new_bids.first)
    new_bid.save
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  def update_biding_status_and_winner_info
    params_bidings = params[:biding]
    params_biding = params_bidings.first
    biding = Bid.where(:user_name => params_biding[:user_name], :activity_name => params_biding[:activity_name], :name => params_biding[:name]).first
    biding.status = params_biding[:status]
    biding.save

    if params[:winner_info]
      params_winner_infos = params[:winner_info]
      params_winner_info = params_winner_infos.first
      winner_info = BidSignUp.where(:user_name => params_winner_info[:user_name], :activity_name => params_winner_info[:activity_name], :bid_name => params_winner_info[:bid_name], :phone => params_winner_info[:phone]).first
      winner_info.is_winner = true
      winner_info.save
    end
    respond_to do |format|
      format.json {render :json => true}
    end
  end

  private
  def update_data(params)
    #return ActivityInfo.update_user_activity_infos(params) && ActivitySignUp.update_user_activity_sign_ups(params) && Bid.update_user_bids(parsms) && BidSignUp.update_user_bid_sign_ups(parmas)
    ActivityInfo.update_user_activity_infos(params)
    ActivitySignUp.update_user_activity_sign_ups(params)
    Bid.update_user_bids(params)
    BidSignUp.update_user_bid_sign_ups(params)
  end

end
