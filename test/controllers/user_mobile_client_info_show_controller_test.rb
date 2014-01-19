require 'test_helper'

class UserMobileClientInfoShowControllerTest < ActionController::TestCase
  test "should get bid_list_view" do
    get :bid_list_view
    assert_response :success
  end

  test "should get activity_sign_up_list_view" do
    get :sign_up_list_view
    assert_response :success
  end

  test "should get detailed_once_bid_view" do
    get :detailed_bid_view
    assert_response :success
  end

  test "should get synchronous_show_view" do
    get :statistics_once_bid_view
    assert_response :success
  end

end
