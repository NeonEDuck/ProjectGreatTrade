var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.get('/', function(req, res, next) {
    req.session.user = null;
    req.session.username = null;
    req.session.userpic = null;
    req.session.shoppingCart = null;
    res.render('logout');  //傳至登出
});

module.exports = router;