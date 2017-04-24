const {mongoose} = require('../db/mongoose');
const {User} = require('../modles/user');
const _ = require('lodash');

var {authenticate} =require('../middleware/authenticate');


module.exports = (app) =>{
    app.post('/users/login', (req, res) => { 
    var body = _.pick(req.body,["email","password"]);  
        User.findByCredentials(body.email,body.password).then((user)=>{
            return user.generateAuthToken().then((token)=>{
                res.header('x-auth',token).send(user);
            });

        }).catch((err)=>{
            res.status(400).send();
        });
              
    });

    app.post('/users/register',(req,res)=>{
       var body = _.pick(req.body,['email','password','name']);
       var user = new User(body);
       
       user.save()
       .then(()=>{
           return user.generateAuthToken();
       })
       .then((token)=>{
            res.header('x-auth',token).send(user);
       })
       .catch((e)=>{
           res.status(400).send(e);
       });
    });

   

    app.get('/users/me',authenticate,(req,res)=>{
       res.send(req.user);
    });
}   