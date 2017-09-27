class Play < ApplicationRecord
  belongs_to :user
  belongs_to :episode
  validates :episode_id, presence: true
  validates :user_id, presence: true
end
