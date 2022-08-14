class CreateEventMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :event_members do |t|
      t.references :event_id, null: false, foreign_key: true
      t.references :user_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
