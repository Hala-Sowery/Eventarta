class AddImagesToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :images, :attachments
  end
end
