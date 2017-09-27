class Episode < ApplicationRecord
  belongs_to :podcast
  has_many :plays
  validates :name, presence: true
  validates :feedUrl, presence: true
  validates :podcast_id, presence: true
end
