class EpisodeSerializer < ActiveModel::Serializer
  attributes :id, :name, :duration, :feedUrl
end
