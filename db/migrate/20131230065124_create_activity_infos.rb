class CreateActivityInfos < ActiveRecord::Migration
  def change
    create_table :activity_infos do |t|
      t.string  :name
      t.string  :status
      t.string  :user_name

      t.timestamps
    end
  end
end
