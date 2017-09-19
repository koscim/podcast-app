class PodcastSerializer < ActiveModel::Serializer
  attributes :id, :collectionId, :artistName, :collectionName, :artUrl, :description, :episodes
end
