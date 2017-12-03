class TransactionsController < ApplicationController
  def create
    @sender = User.find_by(wallet_id: params[:transaction][:sender_wallet_id])
    @recipient = User.find_by(wallet_id: params[:transaction][:recipient_wallet_id]) 
    if @recipient.present?
      @transaction = Transaction.new(sender_id: @sender.id, recipient_id: @recipient.id, 
        amount: params[:transaction][:amount], description: params[:transaction][:description])
      if @transaction.save
        @sender.account_balance = @sender.account_balance - params[:transaction][:amount]
        @recipient.account_balance = @recipient.account_balance + params[:transaction][:amount]
        @sender.save
        @recipient.save
        render json: @transaction
      else
        render json: @transaction.errors.full_messages, status: 401
      end
    else
      render json: "Invalid recipient wallet_id!", status: 401
    end
  end
  def index
    @transactions = Transaction.all
    if @transactions.length > 0
      render json: @transactions
    else
      render json: "There's no transaction yet!"
    end
  end
  def recent_transactions
    @all = Transaction.all
    @transactions = @all.first(5)
    if @transactions.length > 0
      render json: @transactions
    else
      render json: "There's no transaction yet!"
    end
  end
end
