class UsersController < ApplicationController
    def create
        begin
            user = User.create!(name: params[:name], email: params[:email], password: params[:password])
            token = generate_token(user.id, user.email)

            render json: {
                status: "succeeded",
                token: token
            }, status: 200
        rescue ActiveRecord::RecordInvalid => invalid
            render json: {
                status: "failed",
                message: invalid.record.errors.objects.first.full_message
            }, status: 400
        end
    end
end