var express = require('express');
var router = express.Router();
const fs = require('fs')

//增加引用函式
var moment = require('moment');
const product = require('./utility/product');

//接收GET請求
router.post('/', function(req, res, next) {
    var prono = req.body.prono;   //取出參數
    var memno = req.session.user;
    var list = [];

    var newData = {
        prono:prono,
        memno:memno
    }
    
    product.getDropdownData().then(d => {
        list=d.label;
    })

    if (req.session.user != null && req.session.user != undefined){
        product.one(newData).then(data => {
            console.log(data)
            if (req.session.user == data.memno){
                if (data==null){
                    res.render('error');  //導向錯誤頁面
                }else if(data==-1){
                    res.render('notFound');  //導向找不到頁面                
                }else{
                    var d = new Date(data.date);
                    data.date = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    if (fs.existsSync('./public/picture/' + data.picture)) {
                        data.picture='picture/' + data.picture;
                    }
                    else {
                        data.picture='images/no_pic.jpg';
                    }
                    res.render('product_update_form', {item:data, label:list});  //將資料傳給顯示頁面
                }  
            }
            else {
                res.render('unAuth');
            }
        })
    }
    else {
        res.render('login_form', {message:'請先登入以修改此商品'});
    }
});

module.exports = router;