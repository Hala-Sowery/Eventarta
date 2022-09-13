class EventMembersController < ApplicationController
    before_action :current_user
    # skip_before_action :verify_authenticity_token

    def create
        event = params[:event_id]
        check_joining = EventMember.find_by(event_id: event, user_id: @user.id)

        if !check_joining
            EventMember.create!(event_id: event, user_id: @user.id)
        else
            check_joining.destroy
        end

        render json:{status: "succeeded"}, status: 200
    end
end