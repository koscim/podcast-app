class Api::V1::PlaysController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    episode = Episode.find(data["episode_id"])
    play = Play.find_by(episode_id: data["episode_id"])
    if play.nil?
      Play.create(
        user: current_user,
        episode: episode
      )
    end
    render json: play;
  end
  def update
    data = JSON.parse(request.body.read)
    episode = Episode.find(data["episode_id"])
    play = Play.find_by(episode_id: data["episode_id"])
    times = play.times
    # if(data["played"])
    #   if (data["played"] >= (data["duration"] - 1))
    #     times = play.times + 1
    #   end
    # end
    play = Play.update(
      params[:id],
      secondsPlayed: data["played"],
      secondsLoaded: data["duration"],
      times: times
    )
  end
end
