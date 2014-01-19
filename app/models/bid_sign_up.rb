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
end
