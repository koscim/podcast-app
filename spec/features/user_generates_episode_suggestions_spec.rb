require 'rails_helper'

feature "user can generate episode suggestions", %() do
  scenario "user generates suggestions without subscriptions" do
    FactoryGirl.create(:user, first_name: 'Craig', last_name: 'Ternow', username: 'harrypotterfan1', email: 'harrypotterfan@hogwarts.com')
    visit '/'
    fill_in 'Email', with: 'harrypotterfan@hogwarts.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'
    expect(page).to have_content("WELCOME BACK CRAIG")
    click_on 'Generate Suggestions'
    expect(page).to have_content("YOU HAVEN'T SUBSCRIBED TO ANY PODCASTS. TO DO SO, PLEASE CLICK ON THE + SIGN IN THE TOP RIGHT CORNER TO SEARCH BY NAME OR CLICK ON GENRES TO BROWSE BY GENRE.")
  end
  scenario "user generates suggestions with subscriptions, but no downtimes", wait: { timeout: 20 } do
    user = FactoryGirl.create(:user, first_name: 'Craig', last_name: 'Ternow', username: 'harrypotterfan1', email: 'harrypotterfan@hogwarts.com')
    first_podcast = Podcast.create(
      id: 1,
      collectionId: '4415',
      artistName: 'Blizzard',
      collectionName: 'StarCraft',
      artUrl: 'protoss.jpg',
      description: 'Welcome to StarCraftCast'
    )
    subscription = Subscription.create(
      user: user,
      podcast: first_podcast
    )
    episode = Episode.create(
      id: 1,
      name: 'Episode 1: Protoss Strikes Back',
      duration: '1929',
      feedUrl: 'feed.mp3',
      podcast: first_podcast,
      imageUrl: 'terrans.jpg',
      description: 'The Protoss are so cool'
    )

    visit '/'
    fill_in 'Email', with: 'harrypotterfan@hogwarts.com'
    fill_in 'Password', with: 'password'
    click_on 'Log in'
    expect(page).to have_content("WELCOME BACK CRAIG")
    click_on 'Generate Suggestions'
    wait_for_ajax
    # expect(page).to have_content("YOU HAVEN'T SUBSCRIBED TO ANY PODCASTS. TO DO SO, PLEASE CLICK ON THE + SIGN IN THE TOP RIGHT CORNER TO SEARCH BY NAME OR CLICK ON GENRES TO BROWSE BY GENRE.")
  end
end
