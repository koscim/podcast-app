class CreatePodcasts < ActiveRecord::Migration[5.1]
  def change
    create_table :podcasts do |t|
      t.string :collectionId, null: false
      t.string :artistName, null: false
      t.string :collectionName, null: false
      t.string :artUrl, null: false
      t.string :description, null: false

      t.timestamps null: false
    end
    add_index(:podcasts, [:collectionId], unique: true)
  end
end
