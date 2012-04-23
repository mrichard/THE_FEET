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




/*** TO DO ***/
ANT Build process or MAKE - minify js and css



