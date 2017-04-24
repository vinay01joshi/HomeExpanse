const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/HomeExpanse',(err,db)=>{
    if(err){
        return console.log('Unable to connect db server.');        
    }

    console.log('Connected to MongoDb Servers');
    db.close();
});