module AuthHelper
	# метод выполняет вход пользователя в систему
	def sign_in(user)
		remember_token = User.new_remember_token
		cookies.permanent[:remember_token] = remember_token
		user.update_attribute(:remember_token, User.encrypt(remember_token))
		self.current_user = user
	end

	# метод устанавливает текущего пользователя
	def current_user=(user)
		@current_user = user
	end

	# метод возвращает текущего пользователя, используя токен, сохраненный в куки
	def current_user
		remember_token = User.encrypt(cookies[:remember_token])
		@current_user ||= User.find_by(remember_token: remember_token)
	end

	# метод проверяет, вошел ли пользователь в систему
	def signed_in?
		!current_user.nil?
	end

	# метод реализует выход пользователя из системы
	def sign_out
		unless current_user.blank?
			current_user.update_attribute(:remember_token, User.encrypt(User.new_remember_token))
			cookies.delete(:remember_token)
			self.current_user = nil
		end
	end
end
