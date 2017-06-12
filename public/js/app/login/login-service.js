var LoginService = function(){
    'use strict';
    var authenticateUser;

    authenticateUser = (data) => {
        var defer = $.Deferred();
        $.ajax({
            type : 'POST',
            url : '/users/login',
            async : false,
            dataType : 'json',
            data : data,
            success : function(data,status,xhr){               
                $.cookie('token',xhr.getResponseHeader('x-auth'),10);
                defer.resolve(data);
            },
            error: function(err){
                defer.reject(err);
            }
        });
         return defer.promise();
    };

    return {
        authenticateUser
    }; 
}();