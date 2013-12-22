class User < ActiveRecord::Base

  PASSWORD_MINIMUM = 4
  PASSWORD_MAXIMUM = 12
  before_create { generate_token(:token) }

  validates :name, :presence => true, :uniqueness => {:case_sensitive => false}
  has_secure_password
  #validates :password, :length => { :minimum => PASSWORD_MINIMUM, :maximum => PASSWORD_MAXIMUM},
  #          :on => :create, :on => :update
  validates_length_of :password, :in => PASSWORD_MINIMUM..PASSWORD_MAXIMUM, :on => :create
  validates_length_of :password, :in => PASSWORD_MINIMUM..PASSWORD_MAXIMUM, :on => :update
  validates :question, :presence => true
  validates :answer, :presence => true

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
