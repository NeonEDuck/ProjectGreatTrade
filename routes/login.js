var express = require('express');
var router = express.Router();
const fs = require('fs')

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var account = req.body.account;                 //取得帳號
    var password = req.body.password;     //取得密碼

    user.login(account, password).then(d => {
        if (d==null){
            req.session.user = null;
            req.session.username = null;
            req.session.userpic = null;  
            res.render('login_Fail');  //傳至登入失敗
        }
        else if (d.exist == 1) {
            if (d.memno != null && d.memno != undefined) {
                var da = new Date(d.dueto);
                if (da > Date.now()) {
                    time = da.getFullYear() + '/' + (da.getMonth()+1) + '/' + da.getDate() + ' ' + da.getHours() + ':' + da.getMinutes() + ':' + da.getSeconds();
                    res.render('login_ban', {time: time});   //導向使用者
                }
                else {
                    req.session.user = d.memno;
                    if (d.nickname != null) {
                        req.session.username = d.nickname;
                    }
                    else {
                        req.session.username = d.memname;
                    }
                    if (fs.existsSync('./public/picture/' + d.picture)) {
                        req.session.userpic='picture/' + d.picture;
                    }
                    else {
                        req.session.userpic='images/no_pic.jpg';
                    }
                    console.log(req.session);
                    res.render('login_show', {name:req.session.username});   //導向使用者
                }
            }
            else {
                res.render('login_form', {message:'密碼錯誤!'});
            }
        }
        else {
            res.render('login_form', {message:'此帳號不存在!'});
        }  
    })
});

module.exports = router;