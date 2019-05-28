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
    var prono = req.body.prono;
    var proname = req.body.proname;
    var price = Number(req.body.price);
    var amt = Number(req.body.amt);
    var description = req.body.description;
    var picture;
    var label;

    if (req.body.picture != 'images/no_pic.jpg'){
        picture = req.body.picture.replace('picture/','');
    }
    if (typeof(req.file) != 'undefined'){
        picture = req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData={
        prono:prono,       
        proname:proname,
        amt:amt,
        price:price,
        description:description,
        picture:picture,
        label:label
    } 
    
    product.edit(newData).then(d => {
        if (d>=0){
            res.render('editSuccess', {results:d, id: req.session.memno});  //傳至成功頁面
        }else{
            res.render('editFail', {id: req.session.memno});     //導向錯誤頁面
        }  
    })
});

module.exports = router;