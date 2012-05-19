find install: which ant
find real path of symbolic link: ls -al /usr/bin/ant
create new file: touch


GITHUB REPO
https://github.com/mrichard/THE_FEET
git remote add origin git@github.com:username/Hello-World.git
git push -u origin master

/*** BoilerPlate Application ***/
Backend:
	Sinatra
	Haml
	MongoDB
	Websockets
	
Frontend:
	jQuery
	Backbone
	Mustache
	Modernizr
	Twitter Bootstrap
	HTML5 Boilerplate


/*** START APP ***/
Starting the app RUN: rackup -p 4567 (runs config.ru)


/*** COMPILE LESS ***/
NEED to edit lessc ruby file with this: https://github.com/harrigan/less.rb/commit/3a4bbc5d964f90af16985a8445e3e65b985efa1d

Compiling LESS RUN: twitter-bootstrap/make 

		Edits in bootstrap make: added a copy command to move files to public/ directory
		
	
/*** Folder Structure ***/
app/ [rb files]

public/ [static files]
	js/
	css/
	html/
	images/

twitter-bootstrap/ [bootstrap LESS app]

views/ [HAML Files]


/*** Special instructions ***/
1) Had to modify the twitter make file to move assets to public folder
2) Had to modify lessc in less gem to handle make build process
3) Had to edit :public and :views variables in Sinatra app to be one folder up due to app/ dir



/*** TO DO ***/
1) ANT Build process or MAKE - minify js and css
2) Add Websockets
3) add DB support for:

	Category (About, BLog, Code Conventions, Articles, Mobile)
		:id
		:label
		:link
	Article (relevant posts people can submit)
		:id
		:title -> title of article
		:summary -> small summary
		:link -> link to article
		:subject -> category (js, css, performance, HTML5)
		
		


