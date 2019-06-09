var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');


//接收POST請求
router.post('/', function(req, res, next) {
    var data = JSON.parse(req.body.data);
    console.log(data);

    // 建立一個新資料物件
    var newData={        
        data:data,
        memno:req.session.user
    }
    if (req.session.user != null && req.session.user != undefined){
        req.session.shoppingCart = []
        order.add(newData).then(d => {
            if (d == 0) {
                res.redirect('back');  //傳至成功頁面
            }
            else{
                res.render('addFail');
            }
        })
    }
    else {
        res.render('login_form', {message:'請先登入以下訂單'});
    }
});

module.exports = router;