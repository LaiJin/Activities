Activities::Application.routes.draw do

  root 'users#login', :as => 'login'
  #get '/login' => 'users#login'
  get '/register' => 'users#register', :as => 'register'
  get '/reset_password' => 'users#reset_password', :as => 'reset_password'
  get 'user/user_welcome' => 'users#user_welcome', :as => 'user_welcome'
  get '/reset_password_question_and_answer' => 'users#reset_password_question_and_answer', :as => 'reset_password_question_and_answer'
  get '/reset_password_setup_new_password'  => 'users#reset_password_setup_new_password', :as => 'reset_password_setup_new_password'
  post '/create_login_session' => 'users#create_login_session'
  post '/reset_password_judgment_name' => 'users#reset_password_judgment_name'
  post '/reset_password_judgment_answer' => 'users#reset_password_judgment_answer'
  post '/reset_password_update_password' => 'users#reset_password_update_password'
  #match '/reset_password_setup_new_password' => 'users#reset_password_update_password', :via=> :post
  delete 'logout' => 'users#logout', :as => 'logout'
  delete 'logout' => 'administrator#logout'
  resources :users, :only => [:create]

  get "administrator/administrator_welcome" => 'administrator#administrator_welcome', :as => 'administrator_welcome'
  get "administrator/edit_user" => 'administrator#edit_user', :as => 'edit_user'
  get "administrator/add_user" => 'administrator#add_user',  :as => 'add_user'
  #resources :users, only: [:create]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'user_welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
