var express = require('express');
var router = express.Router();

//接收GET請求
const member = require('./utility/member');
const fs = require('fs');

router.post('/', function(req, res, next) {
    var memno = req.body.memno;
    var payment; 
    console.log(memno);
    member.getPayment().then(data => {
        payment = data;
    })
    if (req.session.user != null && req.session.user != undefined){
        if (req.session.user == memno){
            member.one(memno).then(data => {
                if(data==null){
                    res.render('error');  //導向錯誤頁面
                }else if(data == -1){
                    res.render('notFound');  //將資料傳給顯示頁面
                }else{
                    var d = new Date(data.birth);
                    data.birth = d.toISOString().substring(0, 10);
                    if (fs.existsSync('./public/picture/' + data.picture)) {
                        data.picture='picture/' + data.picture;
                    }
                    else {
                        data.picture='images/no_avatar.jpg';
                    }
                    res.render('member_edit', {items:data,payment:payment});  //導向找不到頁面
                }
            })
        }
        else {
            res.render('unAuth');
        }
    }
    else {
        res.render('login_form', {message:'請先登入以修改此商品'});
    }
});

module.exports = router;