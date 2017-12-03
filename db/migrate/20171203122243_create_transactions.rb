class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.integer :sender_id
      t.integer :recipient_id
      t.decimal :amount
      t.text :description

      t.timestamps
    end
  end
end
