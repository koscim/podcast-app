class CreateDowntimes < ActiveRecord::Migration[5.1]
  def change
    create_table :downtimes do |t|
      t.string :name, null: false
      t.string :startTime, null: false
      t.string :endTime
      t.float :duration
      t.string :genre
      t.integer :user_id, null: false
    end
  end
end
