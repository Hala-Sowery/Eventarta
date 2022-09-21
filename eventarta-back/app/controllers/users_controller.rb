class UsersController < ApplicationController
    before_action :current_user, only: [:created_events, :joined_events]

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

    def created_events
        events = @user.events
        the_events = []
        events.each do |event| 
            joined_status = false
            if @user
               joined_status = EventMember.find_by(event_id: event.id, user_id: @user.id).present?
            end

            images = []
            event.images.each do |image|
                images << "http://127.0.0.1:3000" + rails_blob_path(image, only_path: true)
            end

            the_events << {
                id: event.id,
                user: event.user.id,
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

        render json: { events: the_events }
    end

    def joined_events
        events = []
        joined = @user.event_members

        joined.each do |event|
            events << event.event
        end

        the_events = []
        events.each do |event| 
            joined_status = false
            if @user
               joined_status = EventMember.find_by(event_id: event.id, user_id: @user.id).present?
            end
            
            images = []
            event.images.each do |image|
                images << "http://127.0.0.1:3000" + rails_blob_path(image, only_path: true)
            end

            the_events << {
                id: event.id,
                user: event.user.id,
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

        render json: { events: the_events }
    end
end