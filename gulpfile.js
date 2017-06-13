var gulp  = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var exec = require('child_process').exec;
var $  = require('gulp-load-plugins')({lazy : true});
var nodemon = require('gulp-nodemon');
var bg = require('gulp-bg');

let bgtask;

gulp.task('vet',function(){
    log('Analyzing source with JSHint and JSCS');
    gulp.src(config.alljs)
    .pipe($.if(args.verbose,$.print()))
    .pipe($.jscs())
    .pipe($.jshint({esversion : 6}))
    .pipe($.jshint.reporter('jshint-stylish',{verbose: true}))
    .pipe($.jshint.reporter('fail'));

});


gulp.task('start',['vet','start-mongo-server'],()=>{
     nodemon({
        script: config.nodeon.script,
        watch : [config.allServerJs],
        ext: 'hbs',
        env: { 'NODE_ENV': 'development' }
  });
});

gulp.task("start-mongo-server", bgtask = bg(config.mongodb.exe, config.mongodb.flag, config.mongodb.dbpath));

/* reusable function */ //
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