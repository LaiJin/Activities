class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.string :question
      t.string :answer
      t.string :token

      t.timestamps
    end
  end
end
