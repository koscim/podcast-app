class CreateCategorizations < ActiveRecord::Migration[5.1]
  def change
    create_table :categorizations do |t|
      t.integer :category_id, null: false
      t.integer :podcast_id, null: false

      t.timestamps null: false
    end
  end
end
