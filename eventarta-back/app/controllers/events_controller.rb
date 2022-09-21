class EventsController < ApplicationController
    before_action :current_user, only: [:create] 
    # before_action :append_images, only: [:create]
    include Rails.application.routes.url_helpers

    def index
        token = request.headers["Authorization"].split(' ').last if request.headers['Authorization']
        user = nil
        if payload = decode_token(token)
            user = User.find_by(id: payload[:id], email: payload[:email])
        end

        events = Event.all
        the_events = []
        events.each do |event|
            joined_status = false
            if user
               joined_status = EventMember.find_by(event_id: event.id, user_id: user.id).present?
            end

            images = []
            event.images.each do |image|
                images << "http://127.0.0.1:3000" + rails_blob_path(image, only_path: true)
            end

            the_events << {
                id: event.id,
                user: event.user,
                title: event.title,
                description: event.description,
                country: event.country,
                city: event.city,
                street: event.street,
                date: event.date,
                capacity: event.capacity,
                images: images,
                joined: event.event_members.count,
                joined_status: joined_status,
                is_approved: event.is_approved,
                kind: event.kind
            }
         end
        render json: the_events
    end

    def create
        begin
            event = Event.create!(user_id: @user.id,title: params[:title], description: params[:description], country: params[:country], city: params[:city], street: params[:street], date: params[:date], capacity: params[:capacity], kind: params[:kind])
            # image_url=rails_blob_path(@event.image , only_path: true) if @event.image.attached?
            if params[:image]
                event.images.attach(params[:image])
            end

            render json: {
                status: "succeeded",
            }, status: 200
        rescue ActiveRecord::RecordInvalid => invalid
            render json: {
                status: "failed",
                message: invalid.record.errors.objects.first.full_message
            }, status: 400
        end
    end
end