class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :subscriptions
  has_many :podcasts, through: :subscriptions
  has_many :downtimes
  has_many :plays
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
