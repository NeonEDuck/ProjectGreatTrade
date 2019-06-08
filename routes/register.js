var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');
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
    var account = req.body.account
    var memname = req.body.memname;                                
    var nickname = req.body.nickname;
    var email = req.body.email; 
    var backupemail = req.body.backupemail;
    var sex = req.body.sex;
    var password = req.body.password;
    var birth = req.body.birth;
    var tel = req.body.tel;
    var picture = null;

    if (typeof(req.file) != 'undefined'){
        picture=req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData={
        memname:memname,
        nickname:nickname,
        email:email,
        backupemail:backupemail,
        sex:sex,
        account:account,
        password:password,
        birth:birth,
        tel:tel,
        picture:picture
    }
    
    user.add(newData).then(d => {
        if (d==0){
            res.render('register_Success');  //傳至成功頁面
        }else{
            res.render('register_Fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;