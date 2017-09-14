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

8.times do
  name = Faker::Book.unique.genre
  Category.create(name: name)
end

100.times do
  name = Faker::Coffee.blend_name
  podcast = Podcast.create(name: name)
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
