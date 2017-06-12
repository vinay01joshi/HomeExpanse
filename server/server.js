const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
var fs = require('fs');

var PORT  = process.env.PORT || 3000;

var app = express();

const publicPath= path.join(__dirname,'../public');

app.set('views',publicPath+'/views');
hbs.registerPartials(path.join(publicPath , '/views/partials'));
app.set('view engine','hbs');

app.use(express.static(publicPath));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method}${req.url}`;
    fs.appendFile('server.log',log + '\n'); 
    next();
});


// hbs.registerHelper('getCurrentYear',()=>{
//     return new Date().getFullYear();
// });

// hbs.registerHelper('screamIt',(text)=>{
//     return text.toUpperCase();
// });
require('./config/route')(app);
require('./config/user-api')(app);
require('./config/electricity-api')(app);


app.listen(PORT,()=>{
    console.log(`server is up on port ${PORT}`);
});


module.exports = {app};