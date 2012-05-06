

var sksGlobalAjax = (function($){
	var _requesting = false;
	
	var _defaultErrorHandler = function(jqXHR, textStatus, errorThrown){
		logger.log('--- DEFAULT ERROR HANDLER ---');
		logger.log('jqXHR -->');
		logger.log(jqXHR);
		logger.log('textStatus -->');
		logger.log(textStatus);
		logger.log('errorThrown -->');
		logger.log(errorThrown);
	};
	var _defaultCompleteHandler = function(jqXHR, textStatus){
		logger.log('--- DEFAULT COMPLETE HANDLER ---');
		_requesting = false;
	};
	
	var _saksAjax = function( _dataObject, callback ) {
		if(!_requesting){
			_requesting = true;
	        $.ajax({
	            url : _dataObject.url,
	            type : _dataObject.type || 'GET',
	            dataType : _dataObject.dataType || 'json',
	            data : _dataObject.data,
	            success : _dataObject.success,
	            complete : function(){
	        		if(_dataObject.complete) _dataObject.complete();
	        		_defaultCompleteHandler(); 
	        		if(callback) callback();
	        	},
	            error : _dataObject.error || _defaultErrorHandler
	        });
		}
    };
    
    var _saksAjaxAsync = function( _dataObject, successHandler ) {
        $.ajax({
            url : _dataObject.url,
            type : _dataObject.type || 'GET',
            dataType : _dataObject.dataType || 'json',
            data : _dataObject.data,
            success : successHandler || function(){logger.log('NO CALL BACK HANDED TO AJAX');},
            error : _dataObject.error || _defaultErrorHandler
        });
    };
    
    return {
    	ajaxRequest : _saksAjax,
    	resetRequesting : function(){_requesting = false},
    	ajaxAsyncRequest : _saksAjaxAsync
    };
})(jQuery);