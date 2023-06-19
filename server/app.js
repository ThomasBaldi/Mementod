var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var picturesRouter = require('./routes/pictures');

var app = express();

app.use(
	cors({
		origin: '*',
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* // Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
	if (!req.oidc.user) {
		res.locals.user == 'Guest';
	} else {
		res.locals.user = req.oidc.user;
	}
	next();
}); */

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
	res.render('error');
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
