class AddIndexToDasDowntimes < ActiveRecord::Migration[5.1]
  def change
    add_index(:day_downtimes, [:downtime_id, :day_id], unique: true)
  end
end
