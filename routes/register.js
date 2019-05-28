var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var account = req.body.account; 
    var Name = req.body.Name;                               
    var Nick = req.body.Nick;
    var Email = req.body.Email;
    var gender = req.body.gender;  
    var password = Number(req.body.password);
    var Birthday = Number(req.body.Telephone);
    var Telephone = Number(req.body.Telephone);

    // 建立一個新資料物件
    var newData={
        account:account,
        Name:Name,
        Nick:Nick,
        Email:Email,
        gender:gender,
        password:password,
        Birthday:Birthday,
        Telephone:Telephone
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