var express = require('express');
var router = express.Router();

//增加引用函式
const product = require('./utility/product');


//接收POST請求
router.post('/', function(req, res, next) {
    var prono = req.body.prono;

    // 建立一個新資料物件
    var newData={        
        prono:prono
    }
    if (req.session.shoppingCart === null || req.session.shoppingCart === undefined) {
        req.session.shoppingCart = [];
    }
    if (req.session.shoppingCart.includes(prono)) {
        for (var i = 0; i < req.session.shoppingCart.length; i++) {
            req.session.shoppingCart = req.session.shoppingCart.splice(i,1);
        }
    }
    res.redirect('back');  //傳至成功頁面
});

module.exports = router;