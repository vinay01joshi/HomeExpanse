module.exports = ()=>{
    var config = {

        /*All js file in my project*/
        alljs: [       
        './server/**/*.js',
        './*.js',
        './public/js/app/**/*.js'
        ],
        allServerJs :[
            'server.js',
            'route.js',
            'user-api.js',
            'electricity-api.js',
            'mongoose.js',
            'authenticate.js',
            'electricity.js',
            'user.js'
        ],
        nodeon :{
            script : 'server/server.js',
            ext: 'hbs',

        },
        mongodb:{
            exe : 'mongod',
            flag : '--dbpath',
            dbpath : 'c:/users/vjosh8/mongo-data'
        }
    };

    return config;
};