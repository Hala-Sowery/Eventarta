class CommentsController < ApplicationController

    def index 
        comments = Comment.all

        render json: comments
    end
    def create
        begin
            comment = Comment.create!(comment_params)

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
    def comment_params
        params.require(:comment).permit(:user, :event, :content)
    end
end
