require "rubygems"
require "bundler/setup"
Bundler.require(:default)

#move public and views up one level
configure do
  set :public_folder, File.dirname(__FILE__) + '/../public'
  set :views, File.dirname(__FILE__) + '/../views'
end

# two version of home page - one html and haml
get '/home' do
  File.read(File.join('public', 'html/home.html'))
end

get '/entry' do
  haml :'entry/entry'
end
