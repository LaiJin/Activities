require 'test_helper'

class AdministratorControllerTest < ActionController::TestCase
  test "should get administrator_welcome" do
    get :administrator_welcome
    assert_response :success
  end

  test "should get edit_user" do
    get :edit_user
    assert_response :success
  end

  test "should get add_user" do
    get :add_user
    assert_response :success
  end

end
