class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :podcast
  validates :user_id, presence: true
  validates :podcast_id, presence: true
end
