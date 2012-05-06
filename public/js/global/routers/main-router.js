var Workspace = Backbone.Router.extend({

	routes: {
		":mainQuery" : "handleRoute" 
	},

	handleRoute: function(mainQuery) {
		logger.log('route --> '+ mainQuery);
		if( mainNavigation[mainQuery] ){
			mainNavigation[mainQuery]();
		} else {
			mainNavigation['sorry']();
		}
  	},

  	var mainNavigation = {
  		about : function() {
  			
  		},
  		blog : function() {
  			
  		},
  		codeConventions : function() {
  			
  		},
  		articles : function() {
  			
  		},
  		mobile : function() {
  			
  		},
  		sorry : function() {
  			
  		}
  	};

});
