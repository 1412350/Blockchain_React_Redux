Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'    
  }
  resources :users, only: [:show, :update]
  resources :transactions, only: [:index, :create]  
  get 'hello_world', to: 'hello_world#index'
  get 'recent_transactions', to: 'transactions#recent_transactions'
  get 'wallet_id/:id', to: 'users#wallet_id'  
  root to: 'users#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
