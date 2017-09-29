require 'rails_helper'
require 'spec_helper'

RSpec.describe Categorization, type: :model do
  it { should belong_to(:category) }
  it { should belong_to(:podcast) }

  it { should have_valid(:category).when(Category.new) }
  it { should have_valid(:podcast).when(Podcast.new) }
end
