class CreatePlays < ActiveRecord::Migration[5.1]
  def change
    create_table :plays do |t|
      t.integer :times, default: 0
      t.float :secondsPlayed, default: 0.0
      t.float :secondsLoaded, default: 0.0
      t.integer :episode_id, null: false
      t.integer :user_id, null: false
    end
  end
end
