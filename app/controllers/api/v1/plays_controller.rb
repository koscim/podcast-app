class Api::V1::PlaysController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    episode = Episode.find(data["episode_id"])
    find_play = Play.find_by(episode_id: data["episode_id"])
    if find_play.nil?
      find_play = Play.create(
        user: current_user,
        episode: episode
      )
    end
    render json: find_play;
  end
  def update
    data = JSON.parse(request.body.read)
    episode = Episode.find(data["episode_id"])
    find_play = Play.find_by(episode_id: data["episode_id"])
    times = find_play.times
    if(data["times"])
      times = find_play.times + 1
    end
    updated_play = Play.update(
      params[:id],
      secondsPlayed: data["played"],
      secondsLoaded: data["duration"],
      times: times
    )
    render json: updated_play
  end
end
