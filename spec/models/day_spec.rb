require 'rails_helper'
require 'spec_helper'

RSpec.describe Day, type: :model do
  it { should have_many(:day_downtimes) }
  it { should have_many(:downtimes) }
end
