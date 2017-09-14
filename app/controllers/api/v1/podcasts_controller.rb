class Api::V1::PodcastsController < ApplicationController
  def index
    if params[:category_id]
      category = Category.find(params[:category_id])
      render json: category.podcasts
    elsif params[:user_id]
      user = User.find(params[:user_id])
      render json: user.podcasts
    else
      render json: Podcast.all
    end
  end
  def show
    render json: Podcast.find(params[:id])
  end
  def recommend
    binding.pry
  end
end
