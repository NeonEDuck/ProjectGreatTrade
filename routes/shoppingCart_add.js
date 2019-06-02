var express = require('express');
var router = express.Router();


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
    if (!req.session.shoppingCart.includes(prono)) {
        req.session.shoppingCart.push(prono)
    }
    console.log(req.session.shoppingCart);
    res.redirect('back');  //傳至成功頁面
});

module.exports = router;