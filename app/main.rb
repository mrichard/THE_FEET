require "rubygems"
require "bundler/setup"
Bundler.require(:default)

#move public and views up one level
configure do
  set :public_folder, File.dirname(__FILE__) + '/../public'
  set :views, File.dirname(__FILE__) + '/../views'
end

# two version of home page - one html and haml
#get '/home' do
#  File.read(File.join('public', 'html/home.html'))
#end

DB = Mongo::Connection.new.db("mydb", :pool_size => 5, :timeout => 5)

# HOME PAGE
get '/entry' do
  haml :'entry/entry'
end

# INFOMATIONAL CODE-CONVENTIONS
get '/code-conventions' do
  haml :'codeconventions/code'
end

# ARTICLE PAGE
get '/news/articles' do  
  # list all articles available  
end  
get '/news/article/:id' do  
  # get a single article  
end  
post '/news/article' do  
  # create a new article  
end  
put '/news/article/:id' do  
  # update an existing article  
end  
delete '/news/article/:id' do  
  # delete an article  
end  
