class Api::V1::PodcastsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    # if params[:category_id]
    #   category = Category.find(params[:category_id])
    #   render json: category.podcasts
    # elsif params[:user_id]
    #   user = User.find(params[:user_id])
    #   render json: user.podcasts
    # else
    #   render json: Podcast.all
    # end
    if params[:category_id]
      category = Category.find(params[:category_id])
      render json: category.podcasts
    else
      user = User.find(current_user.id)
      render json: user.podcasts
    end
  end
  def show
    render json: Podcast.find(params[:id])
  end
  def recommend
    binding.pry
  end
  def create
    data = JSON.parse(request.body.read)
    podcast = Podcast.find_by(collectionId: data["id"])
    if podcast.nil?
      podcast = Podcast.create(
        collectionId: data["id"],
        artistName: data["artist_name"],
        collectionName: data["collection_name"],
        artUrl: data["art_url"],
        description: data["description"]
      )
      if(data["genres"])
        data["genres"].each_with_index do |genre, index|
          category = Category.find_by(name: genre)
          if category.nil?
            category = Category.create(
              name: genre,
              genre_id: data["genre_ids"][index]
            )
          end
          Categorization.create(
            podcast: podcast,
            category: category
          )
        end
      end
      data["episodes"].each do |episode|
        if episode["enclosure"]
          if episode["enclosure"]["url"]
            mp3 = episode["enclosure"]["url"]
          end
        elsif episode["content"]
          if episode["content"]["url"]
            mp3 = episode["content"]["url"]
          end
        elsif episode["link"]
            mp3 = episode["link"]
        end

        if episode["duration"]
          duration = episode["duration"]
          if duration.split(":").count == 2
            minutes, seconds = duration.split(":").map(&:to_i)
            duration = ((minutes * 60) + seconds).to_s
          elsif duration.split(":").count == 3
            hours, minutes, seconds = duration.split(":").map(&:to_i)
            duration = (((hours * 60) + minutes) * 60 + seconds).to_s
          end
        end

        if episode["title"]
          name = episode["title"]
        end

        if episode["image"]
          if episode["image"]["href"]
            image = episode["image"]["href"]
          end
        end

        if episode["description"]
          description = episode["description"]
        end

        episode = Episode.create(
          name: name,
          feedUrl: mp3,
          duration: duration,
          podcast: podcast,
          imageUrl: image,
          description: description
        )
      end
    end
      subscription = Subscription.create(user: current_user, podcast: podcast)
      render json: podcast
  end

  def destroy
    podcast = Podcast.find(params[:id])
    subscription = Subscription.find_by(podcast: podcast, user: current_user)
    subscription.destroy
  end

  def refresh

  end
end
