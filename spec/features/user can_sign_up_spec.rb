require 'rails_helper'

feature "user can sign up", %() do
  scenario "user signs up successfully" do
    visit '/'
    # fill_in 'Email', with: 'koscim@gmail.com'
    click_on 'Sign up'
    expect(page).to have_content("SIGN UP")
    fill_in 'First Name', with: 'Craig'
    fill_in 'Last Name', with: 'Ternow'
    fill_in 'Username', with: 'harrypotterfan1'
    fill_in 'Email', with: 'harrypotterfan@hogwarts.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_on 'Sign up'
    expect(page).to have_content("WELCOME BACK CRAIG")
  end
  scenario "user signs up unsuccessfully" do
    visit '/'
    # fill_in 'Email', with: 'koscim@gmail.com'
    click_on 'Sign up'
    expect(page).to have_content("SIGN UP")
    fill_in 'First Name', with: 'Craig'
    fill_in 'Last Name', with: 'Ternow'
    fill_in 'Username', with: 'harrypotterfan1'
    fill_in 'Email', with: 'harrypotterfan@hogwarts.com'
    fill_in 'Password', with: 'pass'
    fill_in 'Password confirmation', with: 'passw'
    click_on 'Sign up'
    expect(page).to have_content("Password confirmation doesn't match Password")
    expect(page).to have_content("Password is too short (minimum is 6 characters)")
  end
end
