class CreateQs < ActiveRecord::Migration
  def change
    create_table :qs do |t|
      t.string :title
      t.text :description
      t.integer :votes, :null => false, :default => 0

      t.timestamps
    end
  end
end
