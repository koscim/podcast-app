class Api::V1::DowntimesController < ApplicationController
  def index
    downtimes = Downtime.where(user: current_user)
    parsed_downtimes = []
    downtimes.each do |downtime|
      parsed_downtime = {
        downtime: downtime,
        startTime: downtime.startTime.strftime("%-I:%M %p"),
        endTime: downtime.endTime.strftime("%-I:%M %p"),
        duration: downtime.duration
      }
      parsed_downtimes << parsed_downtime
    end
    render json: parsed_downtimes
  end
  def show
    render json: Downtime.find(params[:id])
  end
end
