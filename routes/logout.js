var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.get('/', function(req, res, next) {
    res.locals.user = null;
    res.locals.username = null;
    res.locals.userpic = null;
    res.locals.shoppingCart = null;
    res.render('logout');  //傳至登出    
});

module.exports = router;