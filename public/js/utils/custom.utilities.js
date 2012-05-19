var logger = (function(){
	//var _location = document.location.hostname.toLowerCase();
	var _canLog = (window.console) ? true : false;
	var _enabled = true;
	//var _testing = (document.location.pathname.toLowerCase().indexOf('globalspecrunner.html') > -1) ? true : false;
	return {
		log : function(value){
			if(_canLog && _enabled )
				console.log(value);
		}
	};
})();