var RegisterController =  function(RegisterService){
     'use strict';
     var registerUser ;

     registerUser = (data) =>{              
        RegisterService
            .registerUser(data)
            .then((response)=>{
                if(response){
                   window.location = "/login";
                }                
            })
            .catch((err)=>{
                console.error(err.responseText);
            });        
     };

     $('.login-button').on('click',function(){        
         var name = $('#name').val();
         var email = $('#email').val();
         var password = $('#password').val();
         var data = {email,name,password};
         registerUser(data);
     })
}(RegisterService);