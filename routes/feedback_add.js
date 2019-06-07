var express = require('express');
var router = express.Router();

//增加引用函式
const feedback = require('./utility/feedback');

//接收POST請求
router.post('/', function(req, res, next) {
    var memno = req.session.user;
    var content = req.body.content;
    
    var newData = {
        memno:memno,
        content:content
    }

    feedback.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;