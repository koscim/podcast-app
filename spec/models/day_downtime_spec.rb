require 'rails_helper'
require 'spec_helper'

RSpec.describe DayDowntime, type: :model do
  it { should belong_to(:downtime) }
  it { should belong_to(:day) }

  it { should have_valid(:downtime).when(Downtime.new) }
  it { should have_valid(:day).when(Day.new) }
end
