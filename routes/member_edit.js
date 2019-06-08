var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');
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
    var memno = req.body.memno;
    var memname = req.body.memname;
    var nickname = req.body.nickname;
    var email = req.body.email;
    var backupemail = req.body.backupemail;
    var picture;
    var sex = req.body.sex;
    var birth = req.body.birth;
    var tel = req.body.tel;
    var address = req.body.address;
    var payno = req.body.payno;


    // 建立一個新資料物件
    var newData={
        memno:memno,
        memname:memname,
        nickname:nickname,
        email:email,
        backupemail:backupemail,
        picture:picture,
        sex:sex,
        birth:birth,
        tel:tel,
        address:address,
        payno:payno
    } 
    
    if (req.session.user != null && req.session.user != undefined){
        if (req.session.user == memno){
            member.edit(newData).then(d => {
                if (d>=0){
                    res.redirect('/member/?user='+memno)
                }else{
                    res.render('editFail');     //導向錯誤頁面
                }  
            })
        }
        else {
            res.render('unAuth');
        }
    }
    else {
        res.render('login_form', {message:'請先登入以修改此商品'});
    }
});

module.exports = router; 