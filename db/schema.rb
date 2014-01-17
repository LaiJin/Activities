# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140117035227) do

  create_table "activity_infos", force: true do |t|
    t.string   "name"
    t.string   "status"
    t.string   "user_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "activity_sign_ups", force: true do |t|
    t.string   "name"
    t.string   "phone"
    t.string   "activity_name"
    t.string   "user_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bid_sign_ups", force: true do |t|
    t.string   "name"
    t.string   "phone"
    t.string   "price"
    t.boolean  "is_winner"
    t.string   "bid_name"
    t.string   "activity_name"
    t.string   "user_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bids", force: true do |t|
    t.string   "name"
    t.string   "status"
    t.string   "user_name"
    t.string   "activity_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "password_digest"
    t.string   "question"
    t.string   "answer"
    t.string   "token"
    t.boolean  "isAdmin",         default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
