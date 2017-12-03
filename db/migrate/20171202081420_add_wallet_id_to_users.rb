class AddWalletIdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :wallet_id, :string
    add_index :users, :wallet_id, unique: true    
  end
end
