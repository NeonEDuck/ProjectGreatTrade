var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    res.render('register_form', {id: req.session.memno});
});

module.exports = router; 