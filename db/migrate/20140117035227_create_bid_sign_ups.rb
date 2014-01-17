class CreateBidSignUps < ActiveRecord::Migration
  def change
    create_table :bid_sign_ups do |t|
      t.string :name
      t.string :phone
      t.string :price
      t.boolean :is_winner
      t.string :bid_name
      t.string :activity_name
      t.string :user_name

      t.timestamps
    end
  end
end
