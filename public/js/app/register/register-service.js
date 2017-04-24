var RegisterService = function(){
     'use strict'
    var registerUser;

    registerUser = (data) => {
        var defer = $.Deferred();
        $.ajax({
            type : 'POST',
            url : '/users/register',
            async : false,
            dataType : 'json',
            data : data,
            success : function(data){
                defer.resolve(data);
            },
            error: function(err){
                defer.reject(err);
            }
        });
         return defer.promise();
    };

    return {
        registerUser : registerUser
    }   
}();