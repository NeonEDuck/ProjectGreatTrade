var express = require('express');
var router = express.Router();

const product = require('./utility/product');

//接收GET請求
router.get('/', function(req, res, next) {
    if (req.session.user != null && req.session.user != undefined){
        product.getDropdownData().then(d => {
            if (d!=[]){
                res.render('product_add_form', {result:d});  //轉至新增頁面
            }else{
                res.render('addFail');     //導向錯誤頁面
            }
        });
    }
    else {
        res.render('login_form', {message:'請先登入以上架商品'});
    }
});

module.exports = router;