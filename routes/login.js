var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var account = req.body.account;                 //取得帳號
    var password = req.body.password;     //取得密碼

    user.login(account, password).then(d => {
        if (d==null){
            req.session.memno = null;
            req.session.nickname = null;           
            res.render('login_Fail');  //傳至登入失敗
        }else{
            req.session.memno = d.memno;
            req.session.nickname = d.nickname;
            res.render('login_show', {name:d.nickname});   //導向使用者
        }  
    })
});

module.exports = router;