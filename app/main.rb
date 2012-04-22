require "rubygems"
require "bundler/setup"
Bundler.require(:default)

#move public up from one level
set :public_folder, File.dirname(__FILE__) + '/../public'

get '/helloworld' do
  File.read(File.join('public', 'html/home.html'))
end
