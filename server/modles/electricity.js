const {mongoose} = require('../db/mongoose');

var ElectricitySchema = new mongoose.Schema({
    year : {
        type : Number,
        required : true
    },
    month : {
        type : String,
        required  : true,
        minlenght : 1 ,
        trim : true
    },
    old : {
        type : Number,
        required : true,        
    },
    new :{
        type : Number,
        require : true
    },
    ratePerUnit :{
        type : Number,
        required : true
    },
    _creator : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
});

var Electricity = mongoose.model('Electricity',ElectricitySchema);
module.exports = {Electricity};