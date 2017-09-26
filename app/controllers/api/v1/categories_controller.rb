require 'json'
require 'net/http'

class Api::V1::CategoriesController < ApplicationController
  def index
    render json: {
      categories: Category.all,
      user: current_user
    }
    # begin
    #   itunes_response = Net::HTTP.get_response(URI.parse('https://itunes.apple.com/search?term=podcast&genreId=1402&limit=40')).body
    # rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
    #   false
    # end
    # itunes_parse = JSON.parse(itunes_response)
    # podcast_feeds = []
    # itunes_parse["results"].each do |result|
    #   podcast_feeds << result["feedUrl"]
    # end
    # feed_data = []
    # podcast_feeds.each do |feed|
    #   begin
    #     feed_response = Net::HTTP.get_response(URI.parse(feed)).body
    #   rescue REXML::ParseException, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
    #     false
    #   end
    #   feed_json = Hash.from_xml(feed_response).to_json
    #   feed_parse = JSON.parse(feed_json)
    #   feed_data << feed_parse
    # end
    # podcasts = []
    # feed_data.each do |podcast|
    #   podcasts << podcast["rss"]["channel"]["item"]
    # end
    # all_episodes = []
    # podcasts.each do |podcast|
    #   podcast.each do |episode|
    #     puts episode
    #     if episode["enclosure"]
    #       if episode["enclosure"]["url"]
    #         all_episodes << episode["enclosure"]["url"]
    #       end
    #     elsif episode["content"]
    #       if episode["content"]["url"]
    #         all_episodes << episode["content"]["url"]
    #       end
    #     elsif episode["link"]
    #       all_episodes << episode["link"]
    #     end
    #   end
    # end
    # binding.pry

    # episode_duration << episode["enclosure"]["duration"]




    # require 'json'
    # require 'net/http'
    # s = Net::HTTP.get_response(URI.parse('http://stackoverflow.com/feeds/tag/ruby/')).body
    # binding.pry
    # json = Hash.from_xml(s).to_json
    # JSON.parse(json)
    # s = Net::HTTP.get_response(URI.parse('http://feeds2.feedburner.com/CraftedByUs')).body
    # json = Hash.from_xml(s).to_json
    # parse = JSON.parse(json)
    # all_episodes = parse["rss"]["channel"]["item"]
    # links = []
    # all_episodes.each do |episode|
    #   links << episode["content"]["url"]
    # end
    # binding.pry
  end
  def show
    OpenSSL::SSL::SSLContext.new :TLSv1
    category = Category.find(params[:id])
    genre_id = category.genre_id
    begin
      itunes_response = Net::HTTP.get_response(URI.parse("https://itunes.apple.com/search?term=podcast&genreId=#{genre_id}&limit=1000")).body
    rescue Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
      false
    end
    itunes_parse = JSON.parse(itunes_response)
    podcasts = []
    itunes_parse["results"].each do |result|
      # feed = result["feedUrl"]
      # begin
      #   feed_response = Net::HTTP.get_response(URI.parse(feed)).body
      # rescue REXML::ParseException, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
      #   false
      # end
      # feed_json = Hash.from_xml(feed_response).to_json
      # feed_parse = JSON.parse(feed_json)
      podcast = {
        artistName: result["artistName"],
        collectionName: result["collectionName"],
        collectionId: result["collectionId"],
        artUrl: result["artworkUrl600"]
        # description: feed_parse["rss"]["channel"]["description"],
        # episodes_data: feed_parse["rss"]["channel"]["item"]
      }
      podcasts << podcast
    end
    # podcast_feeds = []
    # itunes_parse["results"].each do |result|
    #   podcast_feeds << result["feedUrl"]
    # end
    # feed_data = []
    render json: {
      podcasts: podcasts,
      category: Category.find(params[:id]),
      current_user: current_user
     }

    # podcast_feeds.each do |feed|
    #   begin
    #     feed_response = Net::HTTP.get_response(URI.parse(feed)).body
    #   rescue REXML::ParseException, Timeout::Error, Errno::EINVAL, Errno::ECONNRESET, EOFError, Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError => e
    #     false
    #   end
    #   feed_json = Hash.from_xml(feed_response).to_json
    #   feed_parse = JSON.parse(feed_json)
    #   feed_data << feed_parse
    # end
    # podcasts = []
    # feed_data.each do |podcast|
    #   podcast_object = {
    #     title: podcast["rss"]["channel"]["title"],
    #     subtitle: podcast["rss"]["channel"]["subtitle"],
    #   }
    #   # item: podcast["rss"]["channel"]["item"]
    #   podcasts << podcast_object
    # end
    # render json: {podcasts}
    # render json: Category.find(params[:id])
  end
end
