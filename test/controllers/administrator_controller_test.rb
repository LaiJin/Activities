require 'test_helper'

class AdministratorControllerTest < ActionController::TestCase
  test "should get administrator_welcome_view" do
    get :administrator_welcome
    assert_response :success
  end

  test "should get edit_user_view" do
    get :edit_user
    assert_response :success
  end

  test "should get add_user_view" do
    get :add_user
    assert_response :success
  end

end
