class User < ApplicationRecord
    has_secure_password
    
    has_many :events
    validates :name, presence: true, length: {minimum: 3, maximum:30}
    validates :email, presence: true, uniqueness: {case_sensitive: false}, length: {maximum: 105}
end
