class AddRecipientWalletToTransactions < ActiveRecord::Migration[5.1]
  def change
    add_column :transactions, :recipient_wallet, :string
  end
end
