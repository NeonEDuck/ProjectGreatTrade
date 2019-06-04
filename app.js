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
var product_update_form = require('./routes/product_update_form');
var product_update = require('./routes/product_update');
var product_remove = require('./routes/product_remove');

var comment_add = require('./routes/comment_add');
var reply_add = require('./routes/reply_add');

var shoppingCart = require('./routes/shoppingCart');
var shoppingCart_add = require('./routes/shoppingCart_add');
var shoppingCart_remove = require('./routes/shoppingCart_remove');

var login_form = require('./routes/login_form');
var login = require('./routes/login');
var log_out = require('./routes/log_out');
var login_show = require('./routes/login_show');
var register = require('./routes/register_form');
var checkAuth = require('./routes/checkAuth');
var profile_edit = require('./routes/profile_edit');
var member_report = require('./routes/member_report');
var profile_show = require('./routes/profile_show');
//var shoppingCart = require('./routes/shoppingCart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var session = require('express-session');
app.use(session({secret: 'MinecraftBruhMoment', cookie: { maxAge: 60*60*1000 },saveUninitialized: false,resave: false}));
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.username = req.session.username;
  res.locals.userpic = req.session.userpic;
  res.locals.shoppingCart = req.session.shoppingCart;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product/add/form', product_add_form);
app.use('/product/add', product_add);
app.use('/product/list', product_list);
app.use('/product/page', product_list);
app.use('/product/edit/form', product_update_form);
app.use('/product/edit', product_update);
app.use('/product/remove', product_remove);
app.use('/product/', product_one);
app.use('/comment', comment_add);
app.use('/reply', reply_add);
app.use('/shoppingCart/add', shoppingCart_add);
app.use('/shoppingCart/remove', shoppingCart_remove);
app.use('/shoppingCart', shoppingCart);
app.use('/login', login_form);
app.use('/user/login', login);
app.use('/user/log_out', log_out);
app.use('/user/login_show', login_show);
app.use('/register', register);
app.use('/profile/edit', profile_edit);
app.use('/member/report', member_report);
app.use('/profile_show', profile_show);
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
