require 'rails_helper'

RSpec.describe Api::V1::CategoriesController, type: :controller do
  let!(:first_podcast) {
    Podcast.create(
      id: 1,
      collectionId: '4415',
      artistName: 'Blizzard',
      collectionName: 'StarCraft',
      artUrl: 'protoss.jpg',
      description: 'Welcome to StarCraftCast')
    }
  let!(:current_user) {
    create(:user)
  }
  let!(:subscription) {
    Subscription.create(
      user: current_user,
      podcast: first_podcast
    )
  }
  let!(:episode) {
    Episode.create(
      id: 1,
      name: 'Episode 1: Protoss Strikes Back',
      duration: '1929',
      feedUrl: 'feed.mp3',
      podcast: first_podcast,
      imageUrl: 'terrans.jpg',
      description: 'The Protoss are so cool'
    )
  }
  let!(:category) {
    Category.create(
      id: 1,
      name: 'Arts',
      genre_id: '1301'
    )
  }

  describe "GET#index" do
    it "should return a list of categories" do
      sign_in(current_user)
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json["categories"][0]["name"]).to eq 'Arts'
      expect(returned_json["categories"][0]["genre_id"]).to eq '1301'
    end
  end

  describe "GET#show" do
    it "should return a list of podcasts associated with a category" do
      sign_in(current_user)
      get :show, params: { id: 1 }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      puts returned_json
      expect(returned_json.length).to eq 3
      expect(returned_json["podcasts"][0]["collectionId"]).to eq '4415'
      expect(returned_json["podcasts"][0]["artistName"]).to eq 'Blizzard'
      expect(returned_json["podcasts"][0]["collectionName"]).to eq 'StarCraft'
      expect(returned_json["podcasts"][0]["artUrl"]).to eq 'protoss.jpg'
    end
  end
end
