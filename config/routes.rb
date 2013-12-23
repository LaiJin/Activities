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



end
