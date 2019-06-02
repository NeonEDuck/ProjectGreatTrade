var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');

//接收GET請求
router.get('/', function(req, res, next) {
    if (req.session.user != null || req.session.user != undefined){
        order.list(req.session.user).then(data => {
            if(data==null){
                res.render('error');  //導向錯誤頁面
            }else{
                res.render('order_show', {items:data});  //將資料傳給顯示頁面
            }
        })
    }
    else {
        res.render('login_form', {message:'請先登入以檢視您的訂單'});
    }
});

module.exports = router;