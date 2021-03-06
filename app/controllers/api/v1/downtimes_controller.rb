require 'time'

class Api::V1::DowntimesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    downtimes = Downtime.where(user: current_user)
    parsed_downtimes = []
    downtimes.each do |downtime|
      parsed_downtime = {
        id: downtime.id,
        downtime: downtime.name,
        startTime: Time.parse(downtime.startTime).strftime("%-I:%M %p"),
        endTime: Time.parse(downtime.endTime).strftime("%-I:%M %p"),
        duration: downtime.duration
      }
      parsed_downtimes << parsed_downtime
    end
    downtime_data = {
      downtimes: parsed_downtimes,
      user: current_user
    }
    render json: downtime_data
  end
  def show
    downtime = Downtime.find(params[:id])
    days = downtime.days
    render json: {
      downtime: downtime,
      current_user: current_user,
      days: days
     }
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

  def destroy
    downtime = Downtime.find(params[:id])
    days = downtime.days
    days.each do |day|
      found_day_downtime = DayDowntime.find_by(
        day: day,
        downtime: downtime
      )
      found_day_downtime.delete
    end
    downtime.delete
    downtimes = Downtime.where(user: current_user)
    render json: downtimes
  end
end
