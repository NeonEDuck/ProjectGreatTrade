var express = require('express');
var router = express.Router();

//增加引用函式
const comment = require('./utility/comment');


//接收POST請求
router.post('/', function(req, res, next) {
    var cmtno = req.body.cmtno;
    var rspcontent = req.body.rspcontent;

    // 建立一個新資料物件
    var newData={
        cmtno:cmtno,
        rspcontent:rspcontent
    } 
    
    comment.reply(newData).then(d => {
        if (d>=0){
            res.render('editSuccess');  //傳至成功頁面
        }else{
            res.render('editFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;