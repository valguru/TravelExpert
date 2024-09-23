Rails.application.routes.draw do
  resources :values
  resources :images
  resources :themes
  resources :users

  post '/auth/login' => "auth#login"
  get '/auth/current' => "auth#current"
  get '/auth/logout' => "auth#logout"
  post '/auth/register' => "auth#register"

  root 'main#index'
end
