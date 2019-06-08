var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');

//接收POST請求
router.post('/', function(req, res, next) {
    var ordno = req.body.ordno;   //取得產品編號
    console.log(req.body.ordno)
    if (req.session.user != null && req.session.user != undefined){
        if (req.session.user == req.body.memno){
            order.remove(ordno).then(d => {
                console.log(d)
            })
        }
        else {
            res.render('unAuth');
        }
    }
    else {
        res.redirect('login_form', {message:'請先登入以檢視您的訂單'});
    }
});

module.exports = router;