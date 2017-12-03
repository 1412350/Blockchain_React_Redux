class AddAccountBalanceToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :account_balance, :decimal   
  end
end
