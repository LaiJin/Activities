class Bid < ActiveRecord::Base

  def self.update_user_bids(params)
    #Bid.transaction do
      Bid.delete_all(:user_name => params[:user_name])
      bids = params[:bids]
      bids.each do |bid|
        bid_info = Bid.new(bid)
        bid_info.save
      end
    #end
  end
end
