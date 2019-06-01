var express = require('express');
var router = express.Router();
const fs = require('fs')

//增加引用函式
const product = require('./utility/product');

router.get('/:pageNo', function(req, res, next) {
    var pageNo = Number(req.params.pageNo);  //頁碼, 轉數字

    // 如果輸入頁碼有誤
    if(isNaN(pageNo) || pageNo < 1){
        pageNo=1;
    }
   
    product.page(pageNo).then(d => {
        if (d == null){
            res.render('error');
        }
        else if (d.data.length >= 0){
            for (var i = 0; i < d.data.length; i++) {
                if (fs.existsSync('./public/picture/' + d.data[i].picture)) {
                    d.data[i].picture='picture/' + d.data[i].picture;
                }
                else {
                    d.data[i].picture='images/no_pic.jpg';
                }
            }
            res.render('product_list', {items:d});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});


//接收GET請求
router.get('/', function(req, res, next) {
    res.redirect('/product/list/1')  //將資料傳給顯示頁面
});

module.exports = router;