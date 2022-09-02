class SessionsController < ApplicationController
    before_action :current_user, only: [:index]

    def index
        render json: {
            name: @user.name
        }, status: 200
    end

    def create
        user = User.find_by(email: params[:email])

        if user && user.authenticate(params[:password])
            token = generate_token(user.id, user.email)

            render json: {
                status: "succeeded",
                token: token
            }, status: 200
        else
            render json: {
                status: "wrong email or password"
            }, status: 400
        end
    end
end