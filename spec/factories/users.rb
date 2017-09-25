FactoryGirl.define do
  factory :user do
    sequence(:first_name) { |n| "Joe#{n}" }
    sequence(:last_name) { |n| "Schmoe#{n}" }
    sequence(:username) { |n| "joeschmoe#{n}" }
    sequence(:email) { |n| "joeschmoe#{n}@gmail.com" }
    password "password"
  end
end
