class Category < ApplicationRecord
  has_many :categorizations
  has_many :podcasts, through: :categorizations
  validates :name, presence: true
  validates :genre_id, presence: true
end
