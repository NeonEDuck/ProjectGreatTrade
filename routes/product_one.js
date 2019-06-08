var express = require('express');
var router = express.Router();
const fs = require('fs')

//增加引用函式
var moment = require('moment');
const product = require('./utility/product');

//接收GET請求
router.get('/:prono', function(req, res, next) {
    var prono = req.params.prono;   //取出參數

    product.one(prono).then(data => {
        console.log(data);
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            var d = new Date(data.date);
            data.date = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            if (fs.existsSync('./public/picture/' + data.picture)) {
                data.picture='picture/' + data.picture;
            }
            else {
                data.picture='images/no_pic.jpg';
            }
            if (fs.existsSync('./public/picture/' + data.member.picture)) {
                data.member.picture='picture/' + data.member.picture;
            }
            else {
                data.member.picture='images/no_pic.jpg';
            }
            for(var i=0; i < data.comment.length;i++){ 
                if (fs.existsSync('./public/picture/' + data.comment[i].picture)) {
                    data.comment[i].picture='picture/' + data.comment[i].picture;
                }
                else {
                    data.comment[i].picture='images/no_pic.jpg';
                }
                if (data.comment[i].cmtdate != null) {
                    var d = new Date(data.comment[i].cmtdate);
                    data.comment[i].cmtdate = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                }
                if (data.comment[i].rspdate != null) {
                    var d = new Date(data.comment[i].rspdate);
                    data.comment[i].rspdate = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                }
            }
            res.render('product_one', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;