var express = require('express');
var router = express.Router();

//增加引用函式
const comment = require('./utility/comment');


//接收POST請求
router.post('/', function(req, res, next) {
    var prono = req.body.prono;
    var cmtcontent = req.body.cmtcontent;
    var memno = req.body.memno;

    // 建立一個新資料物件
    var newData={
        prono:prono,
        cmtcontent:cmtcontent,
        memno:memno,
    } 
    
    comment.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;