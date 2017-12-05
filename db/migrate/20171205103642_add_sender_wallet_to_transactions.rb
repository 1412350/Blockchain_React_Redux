class AddSenderWalletToTransactions < ActiveRecord::Migration[5.1]
  def change
    add_column :transactions, :sender_wallet, :string
  end
end
