var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var id = req.body.id;                 //取得帳號
    var password = req.body.password;     //取得密碼

    user.login(id, password).then(d => {
        if (d==null){
            req.session.id = null;
            req.session.name = null;           
            res.render('loginFail');  //傳至登入失敗
        }else{
            req.session.id = d.empno;
            req.session.name = d.empname;
            res.render('user_show', {name:d.empname});   //導向使用者
        }  
    })
});

module.exports = router;