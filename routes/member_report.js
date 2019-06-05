var express = require('express');
var router = express.Router();


const product = require('./utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
    product.getDropdownData().then(d => {
        res.render('member_report', {result:d});
    });
});

module.exports = router; 