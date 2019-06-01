var express = require('express');
var router = express.Router();

const shoppingCart = require('./utility/shoppingCart');
const fs = require('fs')

//接收GET請求
router.get('/', function(req, res, next) {

    shoppingCart.one(req.session.shoppingCart).then(d => {
        if (d == null){
            res.render('error');
        }
        else if (d.length > 0){
            var sum = 0;
            for (var i = 0; i < d.length; i++) {
                if (fs.existsSync('./public/picture/' + d[i].picture)) {
                    d[i].picture='picture/' + d[i].picture;
                }
                else {
                    d[i].picture='images/no_pic.jpg';
                }
            }
            for (var i = 0;i < d.length; i++) {
                sum+= d[i].price;
            }

            res.render('shoppingCart', {items:d, sum:sum});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }
    });
});

module.exports = router; 