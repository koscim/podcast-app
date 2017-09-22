class Api::V1::UsersController < ApplicationController
  def index
    user_data = {
      current_user: current_user
    }
    render json: user_data
    # render json: User.all
  end
  # def show
  #   render json: User.find(params[:id])
  # end
  def search
    OpenSSL::SSL::SSLContext.new :TLSv1
    name = params[:name]
    begin
      itunes_response = Net::HTTP.get_response(URI.parse("https://itunes.apple.com/search?media=podcast&term=#{name}&limit=20")).body
    rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
      false
    end
    itunes_parse = JSON.parse(itunes_response)
    render json: itunes_parse
    # fetch('https://itunes.apple.com/search?media=podcast&term=nerdcast')
  end
  def fetch
    OpenSSL::SSL::SSLContext.new :TLSv1
    collectionId = params[:id]
    begin
      itunes_response = Net::HTTP.get_response(URI.parse("https://itunes.apple.com/lookup?id=#{collectionId}")).body
    rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
      false
    end
    itunes_parse = JSON.parse(itunes_response)
    feed = itunes_parse["results"][0]["feedUrl"]
    begin
      feed_response = Net::HTTP.get_response(URI.parse(feed)).body
    rescue REXML::ParseException, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
      false
    end
    feed_json = Hash.from_xml(feed_response).to_json
    feed_parse = JSON.parse(feed_json)
    podcast = {
      description: feed_parse["rss"]["channel"]["description"],
      episodes_data: feed_parse["rss"]["channel"]["item"]
    }
    render json: podcast
  end
  def recommend
    current_time = params[:time]
    split_time = current_time.split(", ")
    parsed_time = Time.parse(split_time[1])
    user = current_user
    podcasts = user.podcasts
    downtimes = user.downtimes
    # day_parsed_downtimes = downtimes.select{ |downtime| downtime.days.select { |day| day.day == parsed_time.strftime("%A")} != [] }
    day_parsed_downtimes = downtimes.select { |downtime| downtime.days.select { |day| day.day == parsed_time.strftime("%A")} != [] }
    # include?(parsed_time.strftime("%A")) }
    # ((time.strftime("%H%M").to_f + downtime.duration) * 1000000000).to_i.to_s
    # day_parsed_downtimes.select { |downtime| (downtime.startTime.strftime("%H%M%S%N") > time.strftime("%H%M")) && (downtime.endTime.strftime("%H%M") < (time.strftime("%H%M").to_f + downtime.duration).to_i.to_s)}


    # selected_downtimes = day_parsed_downtimes.select { |downtime| (Time.parse(downtime.startTime).strftime("%H%M") > parsed_time.strftime("%H%M")) && (Time.parse(downtime.endTime).strftime("%H%M") < (parsed_time.strftime("%H%M").to_f + Time.at(downtime.duration).utc.strftime("%H%M").to_f).to_i.to_s)}

    selected_downtimes = day_parsed_downtimes.select { |downtime| (Time.parse(downtime.startTime).strftime("%H%M") > (parsed_time.strftime("%H%M").to_f - Time.at(3600).utc.strftime("%H%M").to_f).to_i.to_s) && (Time.parse(downtime.endTime).strftime("%H%M") < (parsed_time.strftime("%H%M").to_f + Time.at(downtime.duration).utc.strftime("%H%M").to_f).to_i.to_s)}



    # selected_downtime = day_parsed_downtimes.select { |downtime| downtime.startTime.strftime("%H%M%S%N") > time.strftime("%H%M%S%N") }
    # selected_downtime = downtimes.select { |downtime| ((downtime.startTime - 3600) > parsed_time) && ((downtime.endTime + 3600) < (parsed_time + (downtime.duration))) }
    # downtimes.select { |downtime| }
    # podcast.each do |podcast|
    #   podcast.episodes.select(duration: )
    # end

    downtime_data = {
      downtime: selected_downtimes[0],
    }
    render json: downtime_data
  end
end
