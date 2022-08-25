class EventsController < ApplicationController
    include Rails.application.routes.url_helpers
    def index
        events = Event.all
        the_events = []
        events.each do |event| 
            the_events << {user: event.user, title:event.title,
             description: event.description, country: event.country,
             city: event.city, street: event.street, date: event.date,
             capacity: event.capacity, is_approved: event.is_approved}
         end
        render json: the_events
    end

    def my_url
        images = []
        events.each do |event| 
           images << rails_blob_path(event.images, disposition: "attachment")
        end
    end

    # private
    # def event_params
    #     params.require(:event).permit(:user, :title, :description, :country, :city, :street,:date, :capacity, :is_approved, images: [])
    # end
end