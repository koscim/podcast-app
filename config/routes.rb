Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'

  resources :podcasts, to: 'static_pages#index' do
    resources :episodes
  end

  # namespace :podcasts do
  #   resources :episodes, to: 'static_pages#index'
  # end

  # get "api/v1/podcasts/:id/recommend", to: 'api/v1/podcasts#recommend'
  get "/search", to: 'static_pages#index'
  resources :podcasts, to: 'static_pages#index'
  resources :categories, to: 'static_pages#index'
  # resources :episodes, to: 'static_pages#index'
  # resources :users, to: 'static_pages#index'
  resources :downtimes, to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :podcasts, only: [:index, :show] do
        resources :episodes, only: [:index, :show]
      end
      resources :categories, only: [:index, :show] do
        resources :podcasts, only: [:index, :show]
      end
      resources :users, only: [:index, :show] do
        get "/search/:name", to: 'users#search'
        get "/fetch/:id", to: 'users#fetch'
        get "/recommend/:time", to: 'users#recommend'
        resources :podcasts, only: [:index, :show, :create]
        resources :downtimes, only: [:index, :show, :create]
      end
      resources :downtimes, only: [:index, :show]
    end
  end
end
