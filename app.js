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
var shoppingCart_confirm = require('./routes/shoppingCart_confirm');

var order_add_form = require('./routes/order_add_form');
var order_add = require('./routes/order_add');
var order_remove = require('./routes/order_remove');
var order_update = require('./routes/order_update');
var buyer_list = require('./routes/buyer_list');
var seller_list = require('./routes/seller_list');
var order_show_form = require('./routes/order_show');
//------------------------------------------------------------

var login_form = require('./routes/login_form');
var login = require('./routes/login');
var logout = require('./routes/logout');
var login_show = require('./routes/login_show');
var register = require('./routes/register');
var register_form = require('./routes/register_form');
var checkAuth = require('./routes/checkAuth');
var member_edit_form = require('./routes/member_edit_form');
var member_edit = require('./routes/member_edit');
var member_report = require('./routes/member_report');
var member_one = require('./routes/member_one');
var feedback = require('./routes/feedback')
var feedback_add = require('./routes/feedback_add')
//var shoppingCart = require('./routes/shoppingCart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var session = require('express-session');
app.use(session({secret: 'MinecraftBruhMoment', cookie: { maxAge: 60*60*1000 },saveUninitialized: false,resave: false}));
app.use(function(req, res, next) {
  req.session.shoppingCart = ['P0000001','P0000002','P0000004','P0000024']
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
app.use('/shoppingCart/confirm', shoppingCart_confirm);
app.use('/shoppingCart', shoppingCart);
app.use('/login', login_form);
app.use('/user/login', login);
app.use('/logout', logout);
app.use('/user/login_show', login_show);
app.use('/register', register_form);
app.use('/user/register', register)
app.use('/order/add/form', order_add_form);
app.use('/order/add', order_add);
app.use('/order/remove', order_remove);
app.use('/order/update', order_update);
app.use('/buyer/list', buyer_list);
app.use('/seller/list', seller_list);
app.use('/order/show/form', order_show_form);
app.use('/member/edit/form', member_edit_form);
app.use('/member/edit', member_edit);
app.use('/member/report', member_report);
app.use('/member/one', member_one);
app.use('/feedback', feedback);
app.use('/feedback/add', feedback_add);
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
