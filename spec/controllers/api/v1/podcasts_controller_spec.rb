require 'rails_helper'

RSpec.describe Api::V1::PodcastsController, type: :controller do
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

  describe "GET#index" do
    it "should return a list of all the podcasts associated with a user" do
      sign_in(current_user)
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["podcasts"][0]["collectionId"]).to eq '4415'
      expect(returned_json["podcasts"][0]["artistName"]).to eq 'Blizzard'
      expect(returned_json["podcasts"][0]["collectionName"]).to eq 'StarCraft'
      expect(returned_json["podcasts"][0]["artUrl"]).to eq 'protoss.jpg'
      expect(returned_json["podcasts"][0]["description"]).to eq 'Welcome to StarCraftCast'

      expect(returned_json["podcasts"][0]["episodes"][0]["name"]).to eq 'Episode 1: Protoss Strikes Back'
      expect(returned_json["podcasts"][0]["episodes"][0]["duration"]).to eq '1929'
      expect(returned_json["podcasts"][0]["episodes"][0]["feedUrl"]).to eq 'feed.mp3'
      expect(returned_json["podcasts"][0]["episodes"][0]["imageUrl"]).to eq 'terrans.jpg'
      expect(returned_json["podcasts"][0]["episodes"][0]["description"]).to eq 'The Protoss are so cool'
    end
  end
  describe "GET#show" do
    it "should return a specific podcast and it's details" do
      sign_in(current_user)
      get :show, params: { id: 1 }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["podcast"]["collectionId"]).to eq '4415'
      expect(returned_json["podcast"]["artistName"]).to eq 'Blizzard'
      expect(returned_json["podcast"]["collectionName"]).to eq 'StarCraft'
      expect(returned_json["podcast"]["artUrl"]).to eq 'protoss.jpg'
      expect(returned_json["podcast"]["description"]).to eq 'Welcome to StarCraftCast'

      expect(returned_json["podcast"]["episodes"][0]["name"]).to eq 'Episode 1: Protoss Strikes Back'
      expect(returned_json["podcast"]["episodes"][0]["duration"]).to eq '1929'
      expect(returned_json["podcast"]["episodes"][0]["feedUrl"]).to eq 'feed.mp3'
      expect(returned_json["podcast"]["episodes"][0]["imageUrl"]).to eq 'terrans.jpg'
      expect(returned_json["podcast"]["episodes"][0]["description"]).to eq 'The Protoss are so cool'
    end
  end
  describe "POST#create" do
    it "returns the json of the newly created podcast" do
      sign_in(current_user)
      post :create, body: {
        id: 2,
        artist_name: 'Netflix',
        collection_name: 'Bojack Horseman',
        art_url: 'willarnet.jpg',
        description: 'This is Bojack Horseman',
        episodes: []
      }.to_json, format: :json

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)

      expect(returned_json["podcast"]["collectionId"]).to eq '2'
      expect(returned_json["podcast"]["artistName"]).to eq 'Netflix'
      expect(returned_json["podcast"]["collectionName"]).to eq 'Bojack Horseman'
      expect(returned_json["podcast"]["artUrl"]).to eq 'willarnet.jpg'
      expect(returned_json["podcast"]["description"]).to eq 'This is Bojack Horseman'
    end
  end
  describe "POST#destroy" do
    it "decreases subscription count by 1" do
      sign_in(current_user)
      podcast = Podcast.create(
          collectionId: '2419',
          artistName: 'Netflix',
          collectionName: 'Bojack Horseman',
          artUrl: 'willarnet.jpg',
          description: 'This is Bojack Horseman')

      Subscription.create(
        user: current_user,
        podcast: podcast
      )
      post :destroy, params: { id: podcast.id }

      expect(Subscription.count).to eq(1)
    end
  end
end
