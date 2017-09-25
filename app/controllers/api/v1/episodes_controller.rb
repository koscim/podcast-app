class Api::V1::EpisodesController < ApplicationController
  def index
    render json: Episode.where(podcast_id: params[:podcast_id])
  end
  def show
    render json: {
      episode: Episode.find(params[:id]),
      current_user: current_user
     }
    # render json: Episode.find(params[:id])
  end
end
