class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :sent_transactions, class_name: "Transaction", foreign_key: "sender_id", dependent: :destroy 
  has_many :received_transactions, class_name: "Transaction", foreign_key: "recipient_id", dependent: :destroy 
end
