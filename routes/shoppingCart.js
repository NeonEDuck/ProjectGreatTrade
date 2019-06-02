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
        else{
            var sum = 0;
            var results = [];
            var product = [];
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
            for (var i = 0;i < d.length; i++) {
                var include = false;
                for (var j = 0; j < results.length; j++) {
                    if (results[j][0].memno==(d[i].memno)) {
                        include = true;
                    }
                }
                if (!include) {
                    results.push([d[i]])
                    product.push([d[i].prono]);
                }
                else {
                    for (var j = 0; j < results.length; j++) {
                        if (results[j][0].memno == d[i].memno) {
                            results[j].push(d[i])
                            product[j].push(d[i].prono);
                            break;
                        }
                    }
                }
            }

            res.render('shoppingCart', {items:results, product:product, sum:sum});  //將資料傳給顯示頁面
        }
    });
});

module.exports = router; 