var ElecitrycityService = function(){
    'use strict'
    var getCurrentYearData;
    var saveCurrentYearData;
    var updateCurrentYearData;
    getCurrentYearData = (year) => {
        var defer = $.Deferred();
        $.ajax({
            type : 'GET',
            url : '/users/electricity',
            async : false,
            data : {year : year},
            dataType : 'json',
            headers: { 'x-auth': $.cookie("token") },            
            success : function(data,status,xhr){                             
                defer.resolve(data);
            },
            error: function(err){
                defer.reject(err);
            }
        });
         return defer.promise();
    };

    saveCurrentYearData = (data)=>{
      var defer = $.Deferred();
        $.ajax({
            type : 'POST',
            url : '/users/electricity',
            async : false,
            dataType : 'json',
            data : data,
            headers: { 'x-auth': $.cookie("token") },            
            success : function(data,status,xhr){                             
                defer.resolve(data);
            },
            error: function(err){
                defer.reject(err);
            }
        });
         return defer.promise();
    }

     updateCurrentYearData = (id,data)=>{
      var defer = $.Deferred();
        $.ajax({
            type : 'PATCH',
            url : '/users/electricity/'+id,
            async : false,
            dataType : 'json',  
            data : data,          
            headers: { 'x-auth': $.cookie("token") },            
            success : function(data,status,xhr){                             
                defer.resolve(data);
            },
            error: function(err){
                defer.reject(err);
            }
        });
         return defer.promise();
    }

    return {
        getCurrentYearData,
        saveCurrentYearData,
        updateCurrentYearData
    }; 
}();