class Bid < ActiveRecord::Base

  def self.update_user_bids(params)
    #Bid.transaction do
    if params[:bids]
      Bid.delete_all(:user_name => params[:user_name])
      bids = params[:bids]
      bids.each do |bid|
        bid_info = Bid.new(bid)
        bid_info.save
      end
    end
    #end
  end

  def self.create_new_bid(params)
    new_bids = params[:new_bids]
    new_bid  = Bid.new(new_bids.first)
    new_bid.save
  end

  def self.update_biding_status(params)
    params_bidings = params[:biding]
    params_biding = params_bidings.first
    biding = Bid.where(:user_name => params_biding[:user_name], :activity_name => params_biding[:activity_name], :name => params_biding[:name]).first
    biding.status = params_biding[:status]
    biding.save
  end

end
