class DayDowntime < ApplicationRecord
  belongs_to :downtime
  belongs_to :day
end
