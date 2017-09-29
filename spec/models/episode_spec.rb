require 'rails_helper'
require 'spec_helper'

RSpec.describe Episode, type: :model do
  it { should belong_to(:podcast) }

  it { should have_valid(:podcast).when(Podcast.new) }

  it { should have_many(:plays) }

  it { should have_valid(:name).when("Episode 1") }
  it { should_not have_valid(:name).when(nil, "")}

  it { should have_valid(:feedUrl).when("nerdcast.html") }
  it { should_not have_valid(:feedUrl).when(nil, "") }
end
