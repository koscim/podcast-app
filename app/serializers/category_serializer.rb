class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :genre_id, :podcasts
end
