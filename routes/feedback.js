var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    if (req.session.user != null || req.session.user != undefined) {
        res.render('feedback'); 
    }
    else {
        res.render('login_form', {message:'請先登入以提供意見'});
    }
});

module.exports = router; 