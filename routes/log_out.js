var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.get('/', function(req, res, next) {
    req.session.id = null;
    req.session.name = null;           
    res.render('user_show', {name:'已登出'});  //傳至登出    
});

module.exports = router;