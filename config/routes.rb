Activities::Application.routes.draw do

  root 'users#login', :as => 'login'
  post '/create_login_session' => 'users#create_login_session'
  get 'user/register' => 'users#register', :as => 'register'
  get '/user_welcome' => 'users#user_welcome', :as => 'user_welcome'
  delete 'logout' => 'users#logout', :as => 'logout'
  resources :users, :only => [:create]

  get '/reset_password/check_user_name_view' => 'reset_password#check_user_name_view', :as => 'check_user_name_view'
  post '/reset_password/check_user_name_view' => 'reset_password#check_user_name'

  get '/reset_password/check_user_answer_view' => 'reset_password#check_user_answer_view', :as => 'check_user_answer_view'
  post '/reset_password/check_user_answer_view' => 'reset_password#check_user_answer'

  get '/reset_password/setup_user_new_password_view' => 'reset_password#setup_user_new_password_view', :as => 'setup_user_new_password_view'
  post '/reset_password/setup_user_new_password_view' => 'reset_password#setup_user_new_password'



  get '/administrator/administrator_welcome_view' => 'administrator#administrator_welcome_view', :as => 'administrator_welcome_view'

  get '/administrator/add_user_view' => 'administrator#add_user_view',  :as => 'add_user_view'
  post '/administrator/add_user_view' => 'administrator#create_user'

  post '/administrator/update_user_password' => 'administrator#update_user_password'
  get '/administrator/edit_user_view' => 'administrator#edit_user_view', :as => 'edit_user_view'

  delete 'delete_user' => 'administrator#delete_user', :as => 'delete_user'

  post '/users/mobile_client_user_login'
  post '/users/synchronous_data'

  get 'user_mobile_client_info_show/bid_list_view' => 'user_mobile_client_info_show#bid_list_view', :as=> 'bid_list_view'
  get 'user_mobile_client_info_show/activity_sign_up_list_view' => 'user_mobile_client_info_show#activity_sign_up_list_view', :as => 'activity_sign_up_list_view'
  get 'user_mobile_client_info_show/detailed_once_bid_view' => 'user_mobile_client_info_show#detailed_once_bid_view', :as => 'detailed_once_bid_view'
  get 'user_mobile_client_info_show/statistics_once_bid_view' => 'user_mobile_client_info_show#statistics_once_bid_view', :as => 'statistics_once_bid_view'

end

