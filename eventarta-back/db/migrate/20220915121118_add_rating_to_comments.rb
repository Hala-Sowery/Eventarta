class AddRatingToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :rate, :integer
  end
end
