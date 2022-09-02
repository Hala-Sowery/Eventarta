class EventsController < ApplicationController
    include Rails.application.routes.url_helpers

    def index
        events = Event.all
        the_events = []
        events.each do |event| 
            images = []
            event.images.each do |image|
                images << "http://127.0.0.1:3000" + rails_blob_path(image, only_path: true)
            end

            the_events << {user: event.user, title:event.title,
             description: event.description, country: event.country,
             city: event.city, street: event.street, date: event.date,
             capacity: event.capacity, images: images, is_approved: event.is_approved}
         end
        render json: the_events
    end

    # private
    # def event_params
    #     params.require(:event).permit(:user, :title, :description, :country, :city, :street,:date, :capacity, :is_approved, images: [])
    # end
end