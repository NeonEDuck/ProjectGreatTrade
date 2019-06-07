var express = require('express');
var router = express.Router();
const fs = require('fs')

const product = require('./utility/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    product.indexList().then(d => {
        if (d == null){
            res.render('error');
        }
        else {
            for (var i = 0; i < d.hot.length; i++) {
                if (fs.existsSync('./public/picture/' + d.hot[i].picture)) {
                    d.hot[i].picture='picture/' + d.hot[i].picture;
                }
                else {
                    d.hot[i].picture='images/no_pic.jpg';
                }
            }
            for (var i = 0; i < d.new.length; i++) {
                if (fs.existsSync('./public/picture/' + d.new[i].picture)) {
                    d.new[i].picture='picture/' + d.new[i].picture;
                }
                else {
                    d.new[i].picture='images/no_pic.jpg';
                }
            }
            res.render('index', {item:d});  //將資料傳給顯示頁面
        }
    })
});

module.exports = router;
