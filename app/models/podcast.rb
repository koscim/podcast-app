class Podcast < ApplicationRecord
  has_many :episodes
  has_many :categorizations
  has_many :categories, through: :categorizations
  has_many :subscriptions
  has_many :users, through: :subscriptions
  validates :collectionId, presence: true
  validates :artistName, presence: true
  validates :collectionName, presence: true
  validates :artUrl, presence: true
  validates :description, presence: true
end
