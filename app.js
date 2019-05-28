var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var product_add_form = require('./routes/product_add_form');
var product_add = require('./routes/product_add');
var product_list = require('./routes/product_list');
var product_one = require('./routes/product_one');
var product_list_show = require('./routes/product_list_show');
var product_list_add = require('./routes/product_list_add');
var product_list_remove_show = require('./routes/product_list_remove_show');
var product_list_remove = require('./routes/product_list_remove');

//------------------------------------------------------------

var login_form = require('./routes/login_form');
var login = require('./routes/login');
var log_out = require('./routes/log_out');
var login_show = require('./routes/login_show');
var register = require('./routes/register_form');
var checkAuth = require('./routes/checkAuth');
//var shoppingCart = require('./routes/shoppingCart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var session = require('express-session');
app.use(session({secret: 'MinecraftBruhMoment', cookie: { maxAge: 60000 }}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product/add/form', checkAuth, product_add_form);
app.use('/product/add', product_add);
app.use('/product/list', product_list);
app.use('/product/page', product_list);
app.use('/product/', product_one);
app.use('/login', login_form);
app.use('/user/login', login);
app.use('/user/log_out', log_out);
app.use('/user/login_show', login_show);
app.use('/register', register);
app.use('/product/list/show', product_list_show);
app.use('/product/list/add', product_list_add);
app.use('/product/list/remove/show', product_list_remove_show);
app.use('/product/list/remove', product_list_remove);
//-----------------------------------------
//------------------------------------------------------------
//-----------------------------------------

//app.use('/shopping_cart', shoppingCart);
app.use(express.static('public/picture'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
