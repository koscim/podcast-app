class CreateEpisodes < ActiveRecord::Migration[5.1]
  def change
    create_table :episodes do |t|
      t.string :name, null: false
      t.string :duration, null: false
      t.string :feedUrl, null: false
      t.string :podcast_id, null: false
      
      t.timestamps null: false
    end
  end
end
