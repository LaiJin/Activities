require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test "should get login" do
    get :login
    assert_response :success
  end

  test "should get register" do
    get :register
    assert_response :success
  end

  test "should get reset_password" do
    get :reset_password
    assert_response :success
  end

  test "should get user_welcome" do
    get :welcome
    assert_response :success
  end

end
