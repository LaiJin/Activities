class User < ActiveRecord::Base

  #attr_accessor :password_confirmation
  before_create { generate_token(:token) }

  validates :name, :presence => true, :uniqueness => {:case_sensitive => false}
  has_secure_password
  validates :password, :length => { :minimum => 6 }, :on => :create
  validates :question, :presence => true
  validates :answer, :presence => true
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
