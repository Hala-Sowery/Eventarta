class EventsController < ApplicationController

    def index
        events = Event.all

        render json: events
    end

    private
    def event_params
        params.require(:event).permit(:user, :title, :description, :country, :city, :street,:date, :capacity, :is_approved)
    end
end