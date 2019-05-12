var express = require('express');
var router = express.Router();

//增加引用函式
const product = require('./utility/product');

//接收POST請求
router.post('/', function(req, res, next) {
    var price = Number(req.body.price);                   
    var label = req.body.label;              
    var description = req.body.description;
    var picture = req.body.picture;  //取得盤點日期

    // 建立一個新資料物件
    var newData={
        price:price,
        label:label,
        description:description,
        paymethod:paymethod,
        picture:picture
    } 
    
    product.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;