var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const product = require('./utility/product');

//接收GET請求
router.get('/:prono', function(req, res, next) {
    var prono = req.params.prono;   //取出參數

    product.one(prono).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            data.inventorydate=moment(data.inventorydate).format("YYYY-MM-DD")
            res.render('product_one', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;