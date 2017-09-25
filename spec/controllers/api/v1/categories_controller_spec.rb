# require 'rails_helper'
#
# RSpec.describe Api::V1::PodcastsController, type: :controller do
#   let!(:first_podcast) {
#     Podcast.create(
#       id: 1,
#       collectionId: '4415',
#       artistName: 'Blizzard',
#       collectionName: 'StarCraft',
#       artUrl: 'protoss.jpg',
#       description: 'Welcome to StarCraftCast')
#     }
#   let!(:current_user) {
#     create(:user)
#   }
#   let!(:subscription) {
#     Subscription.create(
#       user: current_user,
#       podcast: first_podcast
#     )
#   }
#   let!(:episode) {
#     Episode.create(
#       id: 1,
#       name: 'Episode 1: Protoss Strikes Back',
#       duration: '1929',
#       feedUrl: 'feed.mp3',
#       podcast: first_podcast,
#       imageUrl: 'terrans.jpg',
#       description: 'The Protoss are so cool'
#     )
#   }
# end
