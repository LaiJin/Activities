require 'test_helper'

class MobileClientControllerTest < ActionController::TestCase
  test "should get mobile_client_user_login_view" do
    get :mobile_client_user_login_view
    assert_response :success
  end

end
