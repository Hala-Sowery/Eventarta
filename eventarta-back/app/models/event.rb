class Event < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :description, presence: true
  validates :country, presence: true
  validates :city, presence: true
  validates :street, presence: true
  validates :date, presence: true
  validates :capacity, presence: true
end
