var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');

//接收POST請求
router.post('/', function(req, res, next) {
    var ordno = req.body.ordno;   //取得產品編號
    var stat = req.body.stat;   //取得產品編號

    var newData = {
        ordno:ordno,
        stat:stat
    }
    order.update(newData).then(d => {
        console.log(d)
    })
});

module.exports = router;