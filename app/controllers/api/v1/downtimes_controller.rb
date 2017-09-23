require 'time'

class Api::V1::DowntimesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    downtimes = Downtime.where(user: current_user)
    parsed_downtimes = []
    downtimes.each do |downtime|
      parsed_downtime = {
        downtime: downtime,
        startTime: Time.parse(downtime.startTime).strftime("%-I:%M %p"),
        endTime: Time.parse(downtime.endTime).strftime("%-I:%M %p"),
        duration: downtime.duration
      }
      parsed_downtimes << parsed_downtime
    end
    render json: parsed_downtimes
  end
  def show
    render json: Downtime.find(params[:id])
  end
  def create
    data = JSON.parse(request.body.read)
    startTime = Time.parse(data["startTime"])
    endTime = Time.parse(data["endTime"])
    duration = endTime - startTime
    downtime = Downtime.create(
      name: data["name"],
      startTime: startTime,
      endTime: endTime,
      genre: data["genreSelected"],
      duration: duration,
      user: current_user
    )
    days = []
    data["days"].each do |key, value|
      if(value == true)
        days << key.capitalize
      end
    end
    days.each do |day|
      found_day = Day.find_by(day: day)
      day_downtime = DayDowntime.find_by(downtime: downtime, day: found_day)
      if day_downtime.nil?
        DayDowntime.create(
          downtime: downtime,
          day: found_day
        )
      end
    end
    render json: downtime
  end
  def update
    data = JSON.parse(request.body.read)
    startTime = Time.parse(data["startTime"])
    endTime = Time.parse(data["endTime"])
    duration = endTime - startTime
    downtime = Downtime.update(
      params[:id],
      name: data["name"],
      startTime: startTime,
      endTime: endTime,
      genre: data["genreSelected"],
      duration: duration,
      user: current_user
    )
    days = []
    delete_days = []
    data["days"].each do |key, value|
      if(value == true)
        days << key.capitalize
      else
        delete_days << key.capitalize
      end
    end
    days.each do |day|
      found_day = Day.find_by(day: day)
      day_downtime = DayDowntime.find_by(downtime: downtime, day: found_day)
      if day_downtime.nil?
        DayDowntime.create(
          downtime: downtime,
          day: found_day
        )
      end
    end
    delete_days.each do |day|
      found_day = Day.find_by(day: day)
      found_day_downtime = DayDowntime.find_by(
        day: found_day,
        downtime: downtime
      )
      if !found_day_downtime.nil?
        found_day_downtime.delete
      end
    end

    render json: downtime
  end
end
