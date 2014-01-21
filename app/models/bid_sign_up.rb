class BidSignUp < ActiveRecord::Base

  def self.update_user_bid_sign_ups(params)
    #BidSignUp.transaction do
    BidSignUp.delete_all(:user_name => params[:user_name])
    bid_sign_ups = params[:bid_sign_ups]
    bid_sign_ups.each do |bid_sign_up|
      bid_sign_up_info = BidSignUp.new(bid_sign_up)
      bid_sign_up_info.save
    end
    #end
  end

  def self.create_new_bid_sign_up(params)
    new_bid_sign_ups = params[:new_bid_sign_ups]
    new_bid_sign_up = BidSignUp.new(new_bid_sign_ups.first)
    new_bid_sign_up.save
  end

  def self.update_winner_info(params)
    if params[:winner_info]
      params_winner_infos = params[:winner_info]
      params_winner_info = params_winner_infos.first
      winner_info = BidSignUp.where(:user_name => params_winner_info[:user_name],
                                    :activity_name => params_winner_info[:activity_name],
                                    :bid_name => params_winner_info[:bid_name],
                                    :phone => params_winner_info[:phone]).first
      winner_info.is_winner = true
      winner_info.save
    end
  end

end
