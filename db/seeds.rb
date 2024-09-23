# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')
User.create!([
{name: "Валентина", email: "val.guru@mail.ru", password: "112233"},
{name: "Kolya", email: "kolya@mail.ru", password: "112233"},
{name: "Ann", email: "ann@mail.ru", password: "112233"},
])
# password: "aaa555*" в 14 строке было

Image.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('images')
Image.create([
{name: 'Египет', file: 'egypt.jpg', theme_id: 1},
{name: 'Турция', file: 'turkey.jpg', theme_id: 1},
{name: 'Греция', file: 'greece.jpg', theme_id: 1},
{name: 'Черногория', file: 'montenegro.jpg', theme_id: 1},
{name: 'Испания', file: 'spain.jpg', theme_id: 1},

{name: 'Шри-Ланка', file: 'sri_lanka.jpg', theme_id: 2},
{name: 'Таиланд', file: 'thailand.jpg', theme_id: 2},
{name: 'Норвегия', file: 'norway.jpg', theme_id: 2},
{name: 'Мексика', file: 'mexico.jpg', theme_id: 2},
{name: 'Гренландия', file: 'greenland.jpg', theme_id: 2},

{name: 'Сочи', file: 'sochi.jpg', theme_id: 3},
{name: 'Айя-Напа, Кипр', file: 'cyprus.jpg', theme_id: 3},
{name: 'Салоу, Испания', file: 'salou_spain.jpg', theme_id: 3},

{name: 'Нидерланды', file: 'netherlands.jpg', theme_id: 4},
{name: 'Швейцария', file: 'switzerland.jpg', theme_id: 4},
{name: 'Франция', file: 'france.jpg', theme_id: 4},
{name: 'Польша', file: 'poland.jpg', theme_id: 4},

{name: 'Азорские острова, Португалия', file: 'portugal.jpg', theme_id: 5},
{name: 'ЮАР', file: 'south_africa.jpg', theme_id: 5},
{name: 'Китай', file: 'china.jpg', theme_id: 5},
])

Theme.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('themes')
Theme.create([
{name: "Летние туры"},
{name: "Зимние туры"},
{name: "Семейные туры"},
{name: "Путешествия по Европе"},
{name: "Активный отдых"},
])