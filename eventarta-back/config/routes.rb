Rails.application.routes.draw do
  get "users/created_events", to: "users#created_events"
  get "users/joined_events", to: "users#joined_events"

  resources :users
  resources :events
  resources :comments
  resources :sessions
  resources :event_members
end
