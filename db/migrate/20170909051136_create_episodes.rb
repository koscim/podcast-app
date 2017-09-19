class CreateEpisodes < ActiveRecord::Migration[5.1]
  def change
    create_table :episodes do |t|
      t.string :name, null: false
      t.string :duration, default: ""
      t.string :feedUrl, null: false
      t.string :podcast_id, null: false
      t.string :imageUrl, default: ""
      t.text :description, default: ""

      t.timestamps null: false
    end
  end
end
