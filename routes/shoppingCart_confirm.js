var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');


//接收POST請求
router.post('/', function(req, res, next) {
    var data = JSON.parse(req.body.data);
    var request = req.body.request;
    console.log(data);

    // 建立一個新資料物件
    var newData={        
        data:data,
        memno:req.session.user,
        request:null
    }
    order.add(newData).then(d => {
        res.redirect('back');  //傳至成功頁面
    })
});

module.exports = router;