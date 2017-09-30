require 'rails_helper'

feature "user can sign in", %() do
  scenario "user signs in successfully" do
    FactoryGirl.create(:user, first_name: 'Craig', last_name: 'Ternow', username: 'harrypotterfan1', email: 'harrypotterfan@hogwarts.com')
    visit '/'
    fill_in 'Email', with: 'harrypotterfan@hogwarts.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'
    expect(page).to have_content("WELCOME BACK CRAIG")
  end
  scenario "user signs in unsuccessfully" do
    FactoryGirl.create(:user, first_name: 'Craig', last_name: 'Ternow', username: 'harrypotterfan1', email: 'harrypotterfan@hogwarts.com')
    visit '/'
    fill_in 'Email', with: 'harrypotterfan@hogwarts.com'
    fill_in 'Password', with: 'passwor'
    click_on 'Log in'
    expect(page).to have_content("Invalid Email or password")
  end
end
