class UsersController < ApplicationController

    def create
        begin
            user = User.create!(user_params)

            render json: {
                status: "succeeded"
            }, status: 200
        rescue ActiveRecord::RecordInvalid => invalid
            render json: {
                status: "failed",
                message: invalid.record.errors.objects.first.full_message
            }, status: 400
        end
    end

    private
    def user_params
        params.require(:user).permit(:name, :admin, :email, :password_digest)
    end
end