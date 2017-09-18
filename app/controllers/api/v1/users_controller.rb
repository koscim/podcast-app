class Api::V1::UsersController < ApplicationController
  def index
    user_data = {
      current_user: current_user
    }
    render json: user_data
    # render json: User.all
  end
  def show
    render json: User.find(params[:id])
  end
end
