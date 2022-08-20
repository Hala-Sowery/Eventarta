class AddIsApprovedToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :is_approved, :boolean
  end
end
