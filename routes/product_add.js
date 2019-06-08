var express = require('express');
var router = express.Router();

//增加引用函式
const product = require('./utility/product');
//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/picture');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize=1024*1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})
//---------------------------


//接收POST請求
router.post('/', upload.single('picture'), function(req, res, next) {
    var proname = req.body.proname;
    var price = Number(req.body.price);
    var amt = Number(req.body.amt);
    var description = req.body.description;
    var picture;
    var lblno = Array.isArray(req.body.lblno)?req.body.lblno:[req.body.lblno];

    if (typeof(req.file) != 'undefined'){
        picture=req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData={        
        proname:proname,
        amt:amt,
        price:price,
        description:description,
        picture:picture,
        memno:req.session.user,
        lblno:lblno
    } 

    if (req.session.user != null && req.session.user != undefined){
        product.add(newData).then(d => {
            if (d==0){
                res.render('addSuccess');  //傳至成功頁面
            }else{
                res.render('addFail');     //導向錯誤頁面
            }  
        })
    }
    else {
        res.render('login_form', {message:'請先登入以上架商品'});
    }
});

module.exports = router;