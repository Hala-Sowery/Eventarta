module Sessions
    require 'jwt'

    SECRET = 'fkasdjkjkakjhcJHJDDDCMMSK%#@$%^&jkbJBJjjlcdbJbjH'

    def generate_token(id, email)
        payload = {id: id, email: email}
        token = JWT.encode payload, SECRET, 'HS256'
    end

    def current_user
        token = request.headers["Authorization"].split(' ').last if request.headers['Authorization']
        payload = decode_token(token)

        unless token && payload && retrieve_user(payload[:id], payload[:email])
            render json: {status: "failed", message: "wrong token"}, status: 401
        end
    end

    def decode_token(token)
        begin
            decode_output = JWT.decode token, SECRET, true, { algorithm: 'HS256' }
            {id: decode_output[0]["id"], email: decode_output[0]["email"]}
        rescue
            nil
        end
    end

    def retrieve_user(id, email)
        @user = User.find_by(id: id, email: email)
    end
end