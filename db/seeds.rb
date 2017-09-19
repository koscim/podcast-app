# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Podcast.delete_all
Episode.delete_all
Category.delete_all
Categorization.delete_all

# 8.times do
#   name = Faker::Book.unique.genre
#   Category.create(name: name)
# end

GENRES = ["Arts", "Comedy", "Education", "Kids & Family", "Health", "TV & Film", "Music", "News & Politics", "Religion & Spirituality",
  "Science & Medicine", "Sports & Recreation", "Technology", "Business", "Game & Hobbies", "Society & Culture", "Government & Organizations"]
GENRE_IDS = ["1301", "1303", "1304", "1305", "1307", "1309", "1310", "1311", "1314", "1315", "1316", "1318", "1321", "1323", "1324", "1325"]

GENRES.each_with_index do |genre, index|
  Category.create(name: genre, genre_id: GENRE_IDS[index])
end

100.times do
  name = Faker::Coffee.blend_name
  podcast = Podcast.create(collection_id: Faker::Number.number(10), artist_name: name, collection_name: Faker::Coffee.variety, art_url: Faker::Placeholdit.image, description: Faker::Coffee.notes)
  20.times do
    name = Faker::Job.title
    duration = Faker::Number.number(2)
    feedUrl = Faker::Internet.url
    Episode.create(name: name, duration: duration, feedUrl: feedUrl, podcast: podcast)
  end
  category_ids = Category.pluck(:id)
  random_category = Category.find(category_ids.sample)
  Categorization.create(podcast: podcast, category: random_category)
end

10.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  username = Faker::Internet.user_name("#{first_name} #{last_name}", %w(. _ -))
  email = Faker::Internet.email
  password = 'password'
  user = User.create!(first_name: first_name, last_name: last_name, username: username, email: email, password: password)
  4.times do
    Subscription.create(user: user, podcast: Podcast.find(1 + rand(100)))
  end
end
