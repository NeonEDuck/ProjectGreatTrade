var express = require('express');
var router = express.Router();

//接收GET請求
const member = require('./utility/member');
const fs = require('fs');

router.get('/', function(req, res, next) {
    var memno = req.query.user;
    console.log(memno);
    member.one(memno).then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data == -1){
            res.render('notFound');  //將資料傳給顯示頁面
        }else{
            var d = new Date(data.birth);
            data.birth = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
            if (fs.existsSync('./public/picture/' + data.picture)) {
                data.picture='picture/' + data.picture;
            }
            else {
                data.picture='images/no_pic.jpg';
            }
            for (var i = 0;i<data.product.length; i++) {
                if (fs.existsSync('./public/picture/' + data.product[i].picture)) {
                    data.product[i].picture='picture/' + data.product[i].picture;
                }
                else {
                    data.product[i].picture='images/no_pic.jpg';
                }
            }
            res.render('member_one', {items:data});  //導向找不到頁面
        } 
    })
});

module.exports = router;