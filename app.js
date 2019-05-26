var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------
var product_add_form = require('./routes/product_add_form');
var product_add = require('./routes/product_add');
var product_list = require('./routes/product_list');

var login_form = require('./routes/login_form');
var login = require('./routes/login');
var log_out = require('./routes/log_out');
var login_show = require('./routes/login_show');

//--------------------------------------------------------------------
// 增加引用模組 
// protectedPage代表需要被保護服務對應的程式
//--------------------------------------------------------------------
var product_list = require('./routes/product_list');
var product_add = require('./routes/product_add');
var product_add_form = require('./routes/product_add_form');
var checkAuth = require('./routes/checkAuth');
//--------------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//--------------------------------------------------------------------
// 增加引用express-session
//--------------------------------------------------------------------
var session = require('express-session');
app.use(session({secret: 'MinecraftBruhMoment', cookie: { maxAge: 60000 }}));
//--------------------------------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//-----------------------------------------
// 設定模組使用方式
//-----------------------------------------
app.use('/product/add/form', product_add_form);
app.use('/product/add', product_add);
app.use('/product/list', product_list);

app.use('/user/login/form', login_form);
app.use('/user/login', login);
app.use('/user/log_out', log_out);
app.use('/user/login_show', login_show);

app.use('/product/add/form', checkAuth, product_add_form);
app.use('/product/add', checkAuth, product_add);
app.use('/product/list', checkAuth, product_list);
//-----------------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
