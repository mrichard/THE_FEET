/**
 * @namespace
 * 	Saks 
 *
 * @description
 * 	Defines a singleton as the namespace for all of our applications to prevent
 * 	collisions with other libraries.
 * 
 * 	The object contains methods which grant the ability to obtain references to
 * 	modules, define and instantiate objects within modules, and extend the
 * 	singleton object with additional functionalities or properties.
 */

(function($, w){
	var global = w;
	global.Saks = global.Saks || {};

	
	$.extend(global.Saks, {
		
	});
	
})(jQuery, window);


(function($){
	
	var global = this; //should be window
	
	// prevent overwriting
	global.Saks = global.Saks || {};
	
	$.extend(global.Saks, {
			
		/**
		 * The scope in which the singleton object is defined.
		 * 
		 * @property global {Object} The singleton scope context
		 */
			
		global: global,
			
		/**
		 * A reusable static method that can retrieve a shared module object
		 * reference when called. This function will create a shared object and
		 * "remember" it internally in connection with a key. This way, every 
		 * subsequent call will return the same object. The closure guarantees 
		 * that it can't be tampered with, and creates a private scope for 
		 * modules where you can define module-specific data. Therefore, modules
		 * would be in a mutable state without being exposed in a way that would
		 * allow for their overwriting.
		 * 
		 * Modules are defined as empty objects, which you can then expand with
		 * your domain specific objects and attributes.
		 *  
		 * When defining modules, note that you shouldn’t use the "new" keyword 
		 * when referencing other modules as they might not have loaded yet.
		 * Save all the code that must run on page load for your application 
		 * loader.
		 * 
		 * ## Defining Modules
		 * 
		 * A way of defining your module using this memoizing technique requires
		 * the following steps:
		 * 
		 * 1. Create an immediately invoked function expression to create a
		 * module specific scope:
		 * 
		 * 		// Module reference argument, assigned at the bottom
		 * 		(function(Friend) {
		 * 
		 * 			//...
		 * 
		 * 		})(Saks.module("Friend"));
		 * 
		 * 2. Define your dependencies at the top of the module, so that they 
		 * are all grouped in a single location. Make sure to include the script
		 * tags for any dependencies before the script tag of the module that 
		 * requires them. This is also a good opportunity to shorthand any 
		 * application references that would be long otherwise.
		 * 
		 * 		// Module reference argument, assigned at the bottom
		 * 
		 * 		(function(Friend) {
		 * 			// Dependencies
		 * 			var Message = Saks.module("message");
		 * 
		 * 			// Shorthands
		 * 			var loadImage = Saks.util.loadImage;
		 * 
		 * 		})(chat.module("friend"));
		 * 
		 * 3. Define the structures contained within your module. Note that you 
		 * shouldn’t use the "new" keyword when referencing other modules as 
		 * they might not have loaded yet. Save all the code that must run on 
		 * page load for your application loader.
		 * 
		 * 		// Module reference argument, assigned at the bottom
		 * 
		 * 		(function(Friend) {
		 * 
		 * 			// Dependencies
		 * 			var Message = Saks.module("message");
		 * 
		 * 			// Define a friend
		 * 			Friend.Model = Backbone.Model.extend({
		 * 				initialize: function() {
		 * 					// Add a nested messages collection
		 * 					this.set({ messages: new Message.List() });
		 * 				}
		 * 			});
		 * 		
		 * 			// Define a friend list
		 * 			Friend.List = Backbone.Collection.extend({
		 * 				model: Friend.Model
		 * 			});
		 * 
		 *		})(Saks.module("friend"));
		 *
		 *	4. Load your application
		 *
		 * 		jQuery(document).ready(function(){
		 * 			...
		 * 			var Friend = Saks.module('friend');
		 * 			new Friend.Model(...);
		 * 			...
		 * 		});
		 * 
		 * @method module
		 * @static
		 * @param {String} name The module name
		 * @return {Object} The referenced module
		 */
			
		// create this closure to contain the cached modules
		module: (function(){
			// internal module cache
			var modules = {};
			
			// create a new module reference scaffold or load an existing module
			return function (name) {
				// if this module has already been created, return it.
				if ( modules[name] ) return modules[name];
				// create a module and save it under this name
				return modules[name] = { View: {} };
			}
		})(),
		
		/**
		 * Creates an instance from the specified dot-separated chain of 
		 * identifiers, where the first reference in the chain is the name of 
		 * the module from which to resolve the remaining identifiers. For 
		 * example here we create an instance of the WideBag class located 
		 * within the View sub-module in the Checkout module.
		 *
		 *		var instance = Saks.create('Checkout.View.WideBag')
		 *
		 * Any remaining arguments passed to this method will be passed to the
		 * Class constructor. For example, here we pass an object literal to the
		 * constructor of the WideBag class.
		 *
		 *		var instance = Saks.create('Checkout.View.Widebag', { 
		 *			model: model 
		 *		});
		 *
		 * @method create
		 * @static
		 * @throws
		 * @param {String} name The dot-separated chain of identifiers where we
		 * lookup for the Class to instantiate.
		 * @return {Mixed} The class instance.
		 */
		
		// create this closure to contain internal construct helper
		create: (function(){
			
			// internal proxy which enables us to pass arguments to a class 
			// constructor
			function construct(klass, args) {
				function F() { klass.apply(this, arguments[0]); }; 
				F.prototype = klass.prototype;
				return new F(args);
			}
			
			// creates an instance of the specified identifier.
			return function (name) {
				
				var chains = name.split('.'),
					length = chains.length,
					args = Array.prototype.slice.call(arguments, 1),
					object, i;
				
				// load the module, which should always be the first identifier 
				// in the chain
				object = this.module(chains[0]);
			
				// iterate through the chained identifiers until the last is 
				// reached, which should be the class definitions.
				for (i = 1; i < length; i++) {
					object = object[chains[i]];
					if (!object) {
						throw new Error(chains[i] + ' is not defined within ' + chains[i-1]) + '.';
					}
				}
			
				// make sure that the object can be instantiated as a class
				if (typeof object !== 'function') {
					throw new Error(name + ' is not a Class.');
				}
				
				return construct(object, args);
			}
		
		})(),
	
		/**
		 * Defines a module object based on the given dot-separated chain of
		 * identifiers if it's not already defined, where the first reference in
		 * the chain is the name of the module from which to resolve the 
		 * remaining identifiers. For example, here we create a WideBag class, 
		 * which extends Backbone.View, within the View sub-module in the 
		 * Checkout module.
		 *
		 *		Saks.define('Checkout.View.WideBag', function(){
		 *			return Backbone.View.extend({
		 *				initialize: function () {
		 *					...
		 *				}
		 *			});
		 *		}); 
		 * 
		 * If you pass a method as the 'value' parameter, it will be executed 
		 * with jQuery as its parameter and its returned value will be assigned
		 * to the object being defined.
		 * 
		 * If a non dot-separated string is provided, the object is defined 
		 * within the global module.
		 * 
		 * 		Saks.define('WideBag', function(){ ... });
		 * 
		 * Usually, if the object is a class you would instantiate it using the 
		 * {@link Saks#create} create method, as it also handles objects defined
		 * in the same format. But, you can also gain reference to the object by
		 * using the {@link Saks#module} module method to retrieve the global
		 * module "*".
		 * 
		 * 		var global = Saks.module('*');
		 * 
		 * For convenience, name resolution is resolved by defining undefined
		 * identifiers as empty objects.
		 * 
		 * @method define
		 * @static
		 * @param {String} name The object to create in string dot-separated 
		 * format, for example: 'Checkout.MiniCart'. If a non dot-separated 
		 * string is provided, the object is created within the global module.
		 * @param {Mixed} value Value for the property being defined, if a
		 * method is passed, it will be executed with jQuery as parameter and
		 * its returned value will be assigned to the property being defined.
		 */


		define: function (name, value) {
			
			var chains = name.split('.'),
				object, identifier;
			
			// add to global 
			if (chains.length == 1) chains.unshift('*');
			
			// load the module, which should always be the first identifier in 
			// the chain
			object = this.module(chains[0]);

			// iterate through the chains of identifier, starting from the 
			// identifier after the module name, resolving undefined identifiers
			// by defining them as empty objects.
			for (var i = 1, l = chains.length - 1; i < l; i++) {
				// identifier in the chain being resolved
				identifier = chains[i];
				// assign an empty object for undefined identifiers
				object = object[identifier] = object[identifier] || {};
			}
			
			// reference the last identifier in the chain
			identifier = chains[i];

			// check the class is not already defined
			if (typeof object[identifier] !== 'undefined') return;
			
			// execute the function and assigned its returned value to the
			// property if the value is a function. Passes jQuery as the method
			// parameter.
			if (typeof value == 'function') object[identifier] = value($);
			// assign value to the property
			else object[identifier] = value;
		},
		
		/**
		 * Merges given members into this namespace, overwriting all matching
		 * properties in the namespace with those in members.
		 * @method extend
		 * @static
		 * @param {Object} members An object containing additional properties 
		 * to merge in.
		 */

		extend: function (members) {
			$.extend(this, members);
		}
	});
	
})(jQuery);