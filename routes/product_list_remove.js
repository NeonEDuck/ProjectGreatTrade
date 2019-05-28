var express = require('express');
var router = express.Router();

//增加引用函式
const product = require('./utility/product');

//接收POST請求
router.post('/', function(req, res, next) {
    var prono = req.body.prono;   //取得產品編號
   
    product.remove(prono).then(d => {
        if(d>=0){
            res.render('removeSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;