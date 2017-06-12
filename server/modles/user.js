const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim: true,
        minlength : 1,
        unique : true,
        validate :{
            isAsync: false,
            validator : validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    name : {
        type : String,
        require : true,
        trim : true,
        minlength : 1        
    },
    password : {
        type : String,
        required : true,
        minlength :6
    },
    tokens:[{
        access : {
            type : String,
            required : true,            
        },
        token:{
            type : String,
            required : true
        }
    }]
}); 

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access =  'auth';
    var token = jwt.sign({_id : user._id.toHexString(),access}, 'somesecret').toString();

    user.tokens.push({access,token});
    return user.save().then(()=>{
        return token;
    });
};

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,'somesecret');
    }catch (e){
       return Promise.reject();
    }
   
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token': token,
        'tokens.access' : 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email,password){
    var user = this;

    return user.findOne({email,password}).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve ,reject)=>{        
             resolve(user);          
        });
    });
};

var User = mongoose.model('User',UserSchema);
module.exports = {User};