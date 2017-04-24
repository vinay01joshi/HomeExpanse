const path = require('path');
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: 'Home Expanse',
            welcomeMessage: 'Welcome to Home Expanse.'
        });
    });

    app.get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About',          
        });
    });

    app.get('/register', (req, res) => {
        res.render('register.hbs', {
            pageTitle: 'Register'
        });
    });

    app.get('/login', (req, res) => {
        res.render('login.hbs', {
            pageTitle: 'Login'
        });
    });  

    app.get('/projects', (req, res) => {
        res.render('projects.hbs', {
            pageTitle: 'Projects'
        });
    });

    app.get('/bad', (req, res) => {
        res.send({
            errorMessage: 'Unable to service your request.'
        });
    });

    //Dashboard related routes
    app.get('/dashboard/:moduleName',(req,res)=>{
        var fileName = req.params.moduleName || 'overview';
        res.render('dashboard.hbs',{           
            modulename : fileName,
            whichPartial : function(){
                return fileName;
            },
            controllerUrl : `/js/app/${fileName}/${fileName}-controller.js`,
            serviceUrl : `/js/app/${fileName}/${fileName}-service.js`
        });
    });
}