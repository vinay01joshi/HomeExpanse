var LoginController = function(LoginService){
    'use strict';

    $('#login-form').on('submit', function(e){
        e.preventDefault();
        var data = {
            email : $('#inputEmail').val(),
            password :$('#inputPassword').val()
        };

        LoginService
            .authenticateUser(data)
            .then((data)=>{
                 window.location = "/dashboard/overview";
            })
            .catch((err)=>{
                console.error(err);
            });

    });
}(LoginService);