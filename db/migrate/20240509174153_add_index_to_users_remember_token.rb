class AddIndexToUsersRememberToken < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :remember_token
  end
end
