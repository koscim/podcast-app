require 'rails_helper'
require 'spec_helper'

RSpec.describe Category, type: :model do
  it { should have_valid(:name).when("Arts") }
  it { should_not have_valid(:name).when(nil, "")}

  it { should have_valid(:genre_id).when(20) }
  it { should_not have_valid(:genre_id).when(nil, "") }

  it { should have_many(:categorizations) }
  it { should have_many(:podcasts) }
end
