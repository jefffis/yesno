class Q < ActiveRecord::Base
	validates :title, :presence => true
	has_attached_file :image_yes,
		:styles => 
		{
			:original => ["400x400#", :jpg]
		},
		:convert_options => {
			:original => "-quality 65 -strip -colorspace RGB"
		}

	has_attached_file :image_no,
		:styles => 
		{
			:original => ["400x400#", :jpg]
		},
		:convert_options => {
			:original => "-quality 65 -strip -colorspace RGB"
		}

	before_create :generate_unique_id

	def generate_unique_id
		self.unique_id = SecureRandom.urlsafe_base64(6, padding=false)
	end

	def to_param
		self.unique_id
	end

	attr_accessible :description, :title, :votes, :image_yes, :image_no, :unique_id, :votes_no, :votes_totes

	self.per_page = 10

end