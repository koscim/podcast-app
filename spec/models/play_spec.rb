require 'rails_helper'
require 'spec_helper'

RSpec.describe Play, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:episode) }

  it { should have_valid(:user).when(User.new) }
  it { should have_valid(:episode).when(Episode.new) }
end
