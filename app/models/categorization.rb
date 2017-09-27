class Categorization < ApplicationRecord
  belongs_to :category
  belongs_to :podcast
  validates :category_id, presence: true
  validates :podcast_id, presence: true
end
