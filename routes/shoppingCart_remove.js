var express = require('express');
var router = express.Router();



//接收POST請求
router.post('/', function(req, res, next) {
    var prono = req.body.prono;

    // 建立一個新資料物件
    var newData={        
        prono:prono
    }
    console.log(prono);
    if (req.session.shoppingCart === null || req.session.shoppingCart === undefined) {
        req.session.shoppingCart = [];
    }
    if (Array.isArray(prono)) {
        for (var j = 0; j < prono.length; j++) {
            if (req.session.shoppingCart.includes(prono[j])) {
                for (var i = 0; i < req.session.shoppingCart.length; i++) {
                    if (req.session.shoppingCart[i] == prono[j]) {
                        req.session.shoppingCart.splice(i,1)
                        break;
                    }
                }
            }
        }
    }
    else {
        if (req.session.shoppingCart.includes(prono)) {
            for (var i = 0; i < req.session.shoppingCart.length; i++) {
                if (req.session.shoppingCart[i] == prono) {
                    req.session.shoppingCart.splice(i,1)
                    break;
                }
            }
        }
    }
    console.log(req.session.shoppingCart);
    res.redirect('back');  //傳至成功頁面
});

module.exports = router;