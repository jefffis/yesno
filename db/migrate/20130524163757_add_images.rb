class AddImages < ActiveRecord::Migration
  def up
  	add_column :qs, :image_yes_file_name, :string
  	add_column :qs, :image_yes_content_type, :string
  	add_column :qs, :image_yes_file_size, :integer
  	add_column :qs, :image_yes_updated_at, :datetime
  	add_column :qs, :image_no_file_name, :string
  	add_column :qs, :image_no_content_type, :string
  	add_column :qs, :image_no_file_size, :integer
  	add_column :qs, :image_no_updated_at, :datetime
  	add_column :qs, :unique_id, :string
  	add_column :qs, :votes_no, :integer, :null => false, :default => 0
  end

  def down
  end
end