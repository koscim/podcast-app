class CreateDowntimes < ActiveRecord::Migration[5.1]
  def change
    create_table :downtimes do |t|
      t.string :name, null: false
      t.time :startTime, null: false
      t.time :endTime
      t.float :duration
      t.integer :user_id, null: false
    end
  end
end
