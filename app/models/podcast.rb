class Podcast < ApplicationRecord
  has_many :episodes
  has_many :categorizations
  has_many :categories, through: :categorizations
  has_many :subscriptions
  has_many :users, through: :subscriptions
end
