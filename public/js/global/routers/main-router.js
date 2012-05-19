var Workspace = Backbone.Router.extend({

	routes: {
		"code-conventions" : "getCodeConventions" 
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
	
	handleRoute: function(mainQuery) {
		logger.log('route --> '+ mainQuery);
		if( mainNavigation[mainQuery] ){
			mainNavigation[mainQuery]();
		} else {
			mainNavigation['sorry']();
		}
  	},
  	
  	getCodeConventions : function(){
  		logger.log('geting code conventions');
  		
  	}

});
