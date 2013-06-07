class AddTotalVotes < ActiveRecord::Migration
  def up
  	add_column :qs, :votes_totes, :integer, :null => false, :default => 0
  end

  def down
  end
end
