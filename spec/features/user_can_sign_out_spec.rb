require 'rails_helper'

feature "user can sign out", %() do
  scenario "user signs out successfully" do
    FactoryGirl.create(:user, first_name: 'Craig', last_name: 'Ternow', username: 'harrypotterfan1', email: 'harrypotterfan@hogwarts.com')
    visit '/'
    fill_in 'Email', with: 'harrypotterfan@hogwarts.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'
    expect(page).to have_content("WELCOME BACK CRAIG")
    click_on 'Sign Out'
  end
end
