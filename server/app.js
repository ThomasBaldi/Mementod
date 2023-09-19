var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

/* 
FOR SECURITY 

const helmet = require('helmet');

//Hide Potentially Dangerous Information
app.use(helmet.hidePoweredBy())
//Mitigate the Risk of Clickjacking
app.use(helmet.frameguard({ action: 'deny' }))
//Mitigate the Risk of Cross Site Scripting (XSS) Attacks
app.use(helmet.xssFilter())
//Avoid Inferring the Response MIME Type
app.use(helmet.noSniff())
//Prevent IE from Opening Untrusted HTML
app.use(helmet.ieNoOpen())
//Ask Browsers to Access Your Site via HTTPS 
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }))
//Disable DNS Prefetching 
app.use(helmet.dnsPrefetchControl())
//Disable Client-Side Caching
app.use(helmet.noCache())
//Set a Content Security Policy
app.use(helmet.contentSecurityPolicy({directives:{
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "trusted-cdn.com"]
}}))

//all the above, apart from the noCache are easily used with app.use(helmet())
//example

app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))

*/

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var picturesRouter = require('./routes/pictures');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/pictures', picturesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ Error: 'error' });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
