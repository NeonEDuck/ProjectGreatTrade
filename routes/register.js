var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var account = req.body.account
    var memname = req.body.memname;                                
    var nickname = req.body.nickname;
    var email = req.body.email; 
    var backupemail = req.body.backupemail;
    var sex = req.body.sex;
    var password = req.body.password;
    var password2 = req.body.password2;
    var birthday = req.body.birthday;
    var tel = req.body.tel;

    // 建立一個新資料物件
    var newData={
        account:account,
        memname:memname,
        nickname:nickname,
        email:email,
        backupemail:backupemail,
        sex:sex,
        password:password,
        password2:password2,
        birthday:birthday,
        tel:tel
    } 
    
    user.add(newData).then(d => {
        if (d==0){
            res.render('registerSuccess');  //傳至成功頁面
        }else{
            res.render('registerFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;