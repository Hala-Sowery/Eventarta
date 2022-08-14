class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.string :country
      t.string :city
      t.string :street
      t.datetime :date
      t.references :publisher, null: false, foreign_key: true
      t.integer :capacity

      t.timestamps
    end
  end
end
