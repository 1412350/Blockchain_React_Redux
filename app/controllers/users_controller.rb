class UsersController < ApplicationController
  def show
    @user = User.find_by(auth_token: params[:id])
    if @user.present?
      render json: @user
    else
      render json: @user.errors.full_messages, status: 401
    end
  end
  def wallet_id
    @user = User.find(params[:id])
    if @user.present?
      render json: @user
    else
      render json: @user.errors.full_messages, status: 401
    end
  end
end
