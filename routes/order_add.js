var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');

//接收POST請求
router.post('/', function(req, res, next) {
    var prono = req.body.prono;                  //取得產品編號
    var proname = req.body.proname;              //取得產品名稱
    var price = Number(req.body.price);          //取得價格
    var inventorydate = req.body.inventorydate;  //取得盤點日期 
    var tel = Number(req.body.tel);
    var address = req.body.address;

    // 建立一個新資料物件
    var newData={
        prono:prono,
        proname:proname,
        price:price,
        inventorydate:inventorydate,
        tel:tel,
        address:address
    } 
    
    if (req.session.user != null && req.session.user != undefined){
        req.session.shoppingCart = []
        order.add(newData).then(d => {
            if (d==0){
                res.render('addSuccess');  //傳至成功頁面
            }else{
                res.render('addFail');     //導向錯誤頁面
            }  
        })
    }
    else {
        res.render('login_form', {message:'請先登入以下訂單'});
    }
});

module.exports = router;