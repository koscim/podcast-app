class Day < ApplicationRecord
  has_many :day_downtimes
  has_many :downtimes, through: :day_downtimes
end
