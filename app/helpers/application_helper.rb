module ApplicationHelper
	def mobile_agent?
	  request.env["HTTP_USER_AGENT"] && request.env["HTTP_USER_AGENT"][/(iPhone|iPad|iPod|BlackBerry|Android)/]
	end
end
