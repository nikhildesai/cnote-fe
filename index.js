var express = require('express'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    router = require('./routes').router;

//===============EXPRESS================
// Configure Express
var app = express();

app.use(logger('combined'));
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', router);

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//===============PORT=================
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port);

