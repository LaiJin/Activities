require 'test_helper'

class PhoneControllerTest < ActionController::TestCase
  test "should get phone_user_login_view" do
    get :phone_user_login
    assert_response :success
  end

end
