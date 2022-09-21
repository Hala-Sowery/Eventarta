class CommentsController < ApplicationController
    before_action :current_user, only: [:create] 
    def index 
        comments = Comment.all

        render json: comments
    end
    def create
        begin
            comment = Comment.create!(user_id: @user.id, event_id: params[:event_id], content: params[:content], rate: params[:rate])

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
end
