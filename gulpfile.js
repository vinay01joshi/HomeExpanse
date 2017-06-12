var gulp  = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var exec = require('child_process').exec;
var $  = require('gulp-load-plugins')({lazy : true});

gulp.task('vet',function(){
    log('Analyzing source with JSHint and JSCS');
    gulp.src(config.alljs)
    .pipe($.if(args.verbose,$.print()))
    .pipe($.jscs())
    .pipe($.jshint({esversion : 6}))
    .pipe($.jshint.reporter('jshint-stylish',{verbose: true}))
    .pipe($.jshint.reporter('fail'));

});


gulp.task('server',(cb)=>{
    log('---- Starting Mongo db Server ----- localhost://HomExpanse');
    exec('mongod --dbpath c:/users/vjosh8/mongo-data',function(err,stdout,stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/* reusable function */
function log(msg){
    if(typeof(msg) == 'object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                $.util.log(util.colors.blue(msg[item]));
            }
        }
    }else{
        $.util.log($.util.colors.blue(msg));
    }
}
