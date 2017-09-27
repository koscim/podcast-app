class Downtime < ApplicationRecord
  belongs_to :user
  has_many :day_downtimes
  has_many :days, through: :day_downtimes
  validates :name, presence: true
  validates :endTime, presence: true
  validates :genre, presence: true
end
