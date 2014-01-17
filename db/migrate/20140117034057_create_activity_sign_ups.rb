class CreateActivitySignUps < ActiveRecord::Migration
  def change
    create_table :activity_sign_ups do |t|
      t.string :name
      t.string :phone
      t.string :activity_name
      t.string :user_name

      t.timestamps
    end
  end
end
