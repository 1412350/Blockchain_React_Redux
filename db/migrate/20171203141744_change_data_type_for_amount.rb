class ChangeDataTypeForAmount < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.change :account_balance, :float
    end
    change_table :transactions do |t|
      t.change :amount, :float
    end
  end
end
