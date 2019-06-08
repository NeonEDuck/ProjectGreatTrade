var express = require('express');
var router = express.Router();


const member = require('./utility/member');
const fs = require('fs');

//接收GET請求
router.post('/', function(req, res, next) {
    var memno = req.body.memno;
    if (req.session.user != null && req.session.user != undefined){
        member.one(memno).then(data => {
            if (fs.existsSync('./public/picture/' + data.picture)) {
                data.picture='picture/' + data.picture;
            }
            else {
                data.picture='images/no_pic.jpg';
            }
            if(data==null){
                res.render('error');  //導向錯誤頁面
            }else if(data == -1){
                res.render('notFound');  //將資料傳給顯示頁面
            }else{
                res.render('member_report', {items:data});  //導向找不到頁面
            } 
        })
    }
    else {
        res.render('login_form', {message:'請先登入以檢舉此會員'});
    }
});

module.exports = router; 