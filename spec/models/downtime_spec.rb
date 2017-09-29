require 'rails_helper'
require 'spec_helper'

RSpec.describe Downtime, type: :model do
  it { should have_valid(:name).when("Morning Commute") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:genre).when("Arts") }
  it { should_not have_valid(:genre).when(nil, "") }

  it { should belong_to(:user) }

  it { should have_valid(:user).when(User.new) }

  it { should have_many(:day_downtimes) }
  it { should have_many(:days) }
end
