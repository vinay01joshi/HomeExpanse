const {mongoose} = require('../db/mongoose');
const {Electricity} =require('../modles/electricity');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {authenticate} =require('../middleware/authenticate');


module.exports = (app)=>{

    app.post('/users/electricity',authenticate,(req,res)=>{        
        var electricity = new Electricity({
            year : req.body.year,
            month : req.body.month,
            old : req.body.old,
            new : req.body.new,
            ratePerUnit : req.body.ratePerUnit,
            _creator : req.user._id
        });

        electricity.save().then((doc)=>{
            res.send(doc);
        },(e)=>{
            res.status(400).send(e);
        });
    });

    app.get('/users/electricity',authenticate,(req,res)=>{      
        Electricity.find({
            _creator : req.user._id,
            year : req.query.year            
        }).then((result)=>{
            res.send(result);
        },(e)=>{
            res.status(400).send(e);
        });
    });

    app.patch('/users/electricity/:id',authenticate,(req,res)=>{
        var id = req.params.id ;
        var body = _.pick(req.body,['old','new','month']);
       
        if(!ObjectID.isValid(id)){           
            res.status(404).send();
        }
         res.send(body);
        Electricity.findOneAndUpdate({
            _id : id,
            _creator : req.user._id
        },{
            $set:body
        },{new : true}).then((elec)=>{
            if(elec){
                return res.status(404).send();
            }
            res.send({elec});
        }).catch((e)=>{
            res.status(400).send();
        });        
    });
};