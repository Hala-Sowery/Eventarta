class AddKindToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :kind, :string
  end
end
