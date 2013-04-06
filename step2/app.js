
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('colors');
var fs = require('fs');

app.get('/', routes.index);
app.post('/contact', function(req, res, next) {
  console.log(req.body.comments.red);
  fs.readFile('./faq.json', function (err, data) {
    if (err) { return next(err); }
    var faqs = JSON.parse(data);
    var answer = faqs[req.body.comments];
    if (answer) {
      console.log(answer);
      res.render("thanks", {title: "the answer", answer: answer});
    }
    else {
      res.redirect("/");
    };
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
