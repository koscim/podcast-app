require 'rails_helper'
require 'spec_helper'

RSpec.describe Podcast, type: :model do
  it { should have_valid(:collectionId).when(102543) }
  it { should_not have_valid(:collectionId).when(nil, "")}

  it { should have_valid(:artistName).when("Nerdcast") }
  it { should_not have_valid(:artistName).when(nil, "") }

  it { should have_valid(:collectionName).when("Nerdist") }
  it { should_not have_valid(:collectionName).when(nil, "") }

  it { should have_valid(:artUrl).when("artUrl").when("image.jpg") }
  it { should_not have_valid(:artUrl).when(nil, "") }

  it { should have_valid(:description).when("this is a podcast") }
  it { should_not have_valid(:description).when(nil, "") }

  it { should have_many(:episodes) }
  it { should have_many(:categorizations) }
  it { should have_many(:categories) }
  it { should have_many(:subscriptions) }
  it { should have_many(:users) }
end
