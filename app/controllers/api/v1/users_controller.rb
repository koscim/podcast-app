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
end
