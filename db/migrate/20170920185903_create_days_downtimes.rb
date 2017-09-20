class CreateDaysDowntimes < ActiveRecord::Migration[5.1]
  def change
    create_table :day_downtimes do |t|
      t.integer :downtime_id, null: false
      t.integer :day_id, null: false
    end
  end
end
