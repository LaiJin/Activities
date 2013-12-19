class User < ActiveRecord::Base

  before_create { generate_token(:token) }
  validates :name, :presence => true, :uniqueness => {:case_sensitive => false}
  has_secure_password
  validates :password, :length => { :minimum => 6 }, :on => :create, :on => :update
  validates :question, :presence => true, :uniqueness => {:case_sensitive => false}
  validates :answer, :presence => true, :uniqueness => {:case_sensitive => false}

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
