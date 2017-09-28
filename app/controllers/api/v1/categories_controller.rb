require 'json'
require 'net/http'

class Api::V1::CategoriesController < ApplicationController
  def index
    render json: {
      categories: Category.all,
      user: current_user
    }
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
      podcast = {
        artistName: result["artistName"],
        collectionName: result["collectionName"],
        collectionId: result["collectionId"],
        artUrl: result["artworkUrl600"]
      }
      podcasts << podcast
    end
    render json: {
      podcasts: podcasts,
      category: Category.find(params[:id]),
      current_user: current_user
     }
  end
end
