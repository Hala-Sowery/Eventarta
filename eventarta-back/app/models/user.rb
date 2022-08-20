class User < ApplicationRecord
    has_many :event
    validates :name, presence: true, length: {minimum: 3, maximum:30}
    validates :email, presence: true, uniqueness: {case_sensitive: false}, length: {maximum: 105}
    has_secure_password
end
