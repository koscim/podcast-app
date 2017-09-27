class DayDowntime < ApplicationRecord
  belongs_to :downtime
  belongs_to :day
  validates :downtime_id, presence: true
  validates :day_id, presence: true
end
