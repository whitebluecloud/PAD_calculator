
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , exp = require('./exp')
  , monster = require('./monlist')
;

// express 3.0 이후에는 아래와 같은 방법으로 사용한다.
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {layout:false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

server = http.createServer(app);
server.listen(80);

app.get('/', function(req, res){
    res.redirect('/exp');
});
app.get('/users', user.list);
app.get('/exp', function(req,res){
    res.render('exp.ejs',{
        exp_100m : exp.exp_100m,
        exp_200m : exp.exp_200m,
        exp_250m : exp.exp_250m,
        exp_300m : exp.exp_300m,
        exp_400m : exp.exp_400m,
        result : null
    });
});

app.post('/exp', function(req,res){
    var search_no = req.body.no;
    for(var i=0; i< monster.list.length; i++){
	if(monster.list[i].no == search_no){
	    if(monster.list[i].type==100){
		monster.list[i].exp = exp.exp_100m;	
	    }
	    else if(monster.list[i].type==150){
                monster.list[i].exp = exp.exp_150m;
            }
	    else if(monster.list[i].type==200){
                monster.list[i].exp = exp.exp_200m;
	    }
            else if(monster.list[i].type==250){
                monster.list[i].exp = exp.exp_250m;
            }
            else if(monster.list[i].type==300){
                monster.list[i].exp = exp.exp_300m;
            }
            else if(monster.list[i].type==400){
                monster.list[i].exp = exp.exp_400m;
            }
            else if(monster.list[i].type==200){
                monster.list[i].exp = exp.exp_200m;
            }else{
		res.redirect('/exp');
	    }
	     res.render('exp.ejs',{
	        result: monster.list[i]
	    });
	}
    }
    res.render('exp.ejs',{
	result: monster.list[i]
    });
});



