var express = require('express');
var router = express.Router();


const member = require('./utility/member');
const fs = require('fs');

//接收GET請求
router.post('/', function(req, res, next) {
    var memno = req.body.memno;
    var type = req.body.type;
    var content = req.body.content;
    var rptcontent = "";

    for (var i = 0; i < type.length; i++) {
        if (i > 0) {
            rptcontent += ", "
        }
        console.log(type[i]);
        switch (type[i]) {
            case "1":
                rptcontent += "商品與實際收到的物品不合"
                break;
            case "2":
                rptcontent += "付款後依舊未收到物品"
                break;
            case "3":
                rptcontent += "詐欺"
                break;
            case "4":
                rptcontent += "隨意取消訂單"
                break;
            case "5":
                rptcontent += "未定期更新進度"
                break;
            case "6":
                if (content != null && content!= undefined) {
                    rptcontent += content
                }
                break;

        }
    }
    var newData = {
        memno: memno,
        rptcontent: rptcontent
    }
    if (req.session.user != null && req.session.user != undefined){
        member.report(newData).then(data => {
            if(data==null){
                res.render('error');  //導向錯誤頁面
            }else if(data == -1){
                res.render('addFail');  //將資料傳給顯示頁面
            }else{
                res.render('addSuccess');  //導向找不到頁面
            } 
        })
    }
    else {
        res.render('login_form', {message:'請先登入以檢舉此會員'});
    }
});

module.exports = router; 