var DashboardService = function(){
     'use strict';
    var getLoginUserDetails;

    getLoginUserDetails = (data) => {
        var defer = $.Deferred();
        $.ajax({
            type : 'POST',
            url : '/users/me',
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
        getLoginUserDetails
    };   
}();