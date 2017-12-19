class Users::RegistrationsController < Devise::RegistrationsController
  def create
    @user = User.new(user_params)
    @user.wallet_id = generate_random(30)
    @user.auth_token = generate_random(30)      
    @user.account_balance = 1000
    p @user
    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages, status: 401
    end
  end  
  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
  def generate_random(number)
    charset = Array('A'..'Z') + Array('a'..'z')
    Array.new(number) { charset.sample }.join
  end
end
