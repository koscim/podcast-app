require 'rails_helper'
require 'spec_helper'

RSpec.describe Subscription, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:podcast) }

  it { should have_valid(:user).when(User.new) }
  it { should have_valid(:podcast).when(Podcast.new) }
end
