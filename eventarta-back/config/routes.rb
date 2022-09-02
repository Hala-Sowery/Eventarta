Rails.application.routes.draw do
  resources :users
  resources :events
  resources :comments
  resources :sessions
end
