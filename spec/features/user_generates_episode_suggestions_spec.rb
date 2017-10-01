require 'rails_helper'

def wait_until
  Timeout.timeout(Capybara.default_max_wait_time) do
    sleep(0.1) until value = yield
    value
  end
end


def wait_for_page_reload
  id = find('html').native.ref
  yield
  wait_until { find('html').native.ref != id }
end

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

    Episode.create(
      id: 2,
      name: 'Episode 1: Protoss Strikes Back',
      duration: '1929',
      feedUrl: 'feed.mp3',
      podcast: first_podcast,
      imageUrl: 'terrans.jpg',
      description: 'The Protoss are so cool'
    )

    Episode.create(
      id: 3,
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
    expect(page).to have_content("YOU HAVEN'T SCHEDULED A DOWNTIME FOR YOUR CURRENT TIME. HERE ARE SOME EPISODES FROM YOUR SUBSCRIPTIONS TO LISTEN TO ANYWAY.")
  end
end
