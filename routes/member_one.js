var express = require('express');
var router = express.Router();

//接收GET請求
const member = require('./utility/member');

router.get('/', function(req, res, next) {
    var memno = req.session.user;
    console.log(memno);
    member.one(memno).then(data => {
        console.log(data);
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data == -1){
            res.render('notFound');  //將資料傳給顯示頁面
        }else{
            res.render('member_one', {items:data});  //導向找不到頁面
        } 
    })
});

module.exports = router;