var express = require('express');
var router = express.Router();
const fs = require('fs')

//增加引用函式
const product = require('./utility/product');

router.post('/', function(req, res, next) {
    if (req.session.user != null && req.session.user != undefined) {
        var prono = req.body.prono;
        var memno = req.session.user;

        // 建立一個新資料物件
        var newData={
            prono:prono,
            memno:memno
        } 
        console.log(newData)
        
        product.addLike(newData)
    }
});

module.exports = router;