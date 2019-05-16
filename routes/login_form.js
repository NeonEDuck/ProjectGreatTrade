var express = require('express');
var router = express.Router();

//增加引用函式
const transaction = require('./utility/transaction');

//接收GET請求
router.get('/', function(req, res, next) {
    transaction.getData().then(d => {
        if (d!=[]){
            res.render('transaction_sale_form', {result:d});
        }else{
            res.render('transFail');
        }  
    });
});

module.exports = router; 