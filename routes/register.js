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
    var birth = req.body.birth;
    var tel = req.body.tel;

    // 建立一個新資料物件
    var newData={
        memname:memname,
        nickname:nickname,
        email:email,
        backupemail:backupemail,
        sex:sex,
        account:account,
        password:password,
        birth:birth,
        tel:tel
    } 
    
    user.add(newData).then(d => {
        if (d==0){
            res.render('register_Success');  //傳至成功頁面
        }else{
            res.render('register_Fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;