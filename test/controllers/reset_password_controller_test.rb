require 'test_helper'

class ResetPasswordControllerTest < ActionController::TestCase
  test "should get check_user_name_view" do
    get :check_user_name_view
    assert_response :success
  end

  test "should get check_user_answer_view" do
    get :check_user_answer_view
    assert_response :success
  end

  test "should get setup_user_new_password_view" do
    get :setup_user_new_password_view
    assert_response :success
  end

end
