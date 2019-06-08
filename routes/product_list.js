var express = require('express');
var router = express.Router();
const fs = require('fs')

//增加引用函式
const product = require('./utility/product');
const user = require('./utility/user');

router.get('/:pageNo', function(req, res, next) {
    var label = [];
    var pageNo = Number(req.params.pageNo);  //頁碼, 轉數字
    var type = req.query.type;  //頁碼, 轉數字
    var search = req.query.search;  //頁碼, 轉數字
    var url = req.url.includes('?')?req.url.slice(req.url.indexOf('?')):""

    if (req.query.data != null && req.query.data != "") {
        label = JSON.parse(req.query.data);
    }
    // 如果輸入頁碼有誤
    if(isNaN(pageNo) || pageNo < 1){
        pageNo=1;
    }
    if(search == undefined || search == null){
        search='';
    }

    var newData={
        pageNo:pageNo,
        search:search,
        label:label
    }
    if(type=="member"){
        user.page(newData).then(d => {
            if (d == null){
                res.render('error');
            }
            else if (d.data.length >= 0){
                for (var i = 0; i < d.data.length; i++) {
                    if (fs.existsSync('./public/picture/' + d.data[i].picture)) {
                        d.data[i].picture='picture/' + d.data[i].picture;
                    }
                    else {
                        d.data[i].picture='images/no_pic.jpg';
                    }
                }
                res.render('member_list', {items:d,search:search,url:url,label:label});  //將資料傳給顯示頁面
            }else{
                res.render('notFound');  //導向找不到頁面
            }  
        })
    }
    else {
        product.page(newData).then(d => {
            if (d == null){
                res.render('error');
            }
            else if (d.data.length >= 0){
                for (var i = 0; i < d.data.length; i++) {
                    var da = new Date(d.data[i].date);
                    d.data[i].date = da.getFullYear() + '/' + (da.getMonth()+1) + '/' + da.getDate() + ' ' + da.getHours() + ':' + da.getMinutes() + ':' + da.getSeconds();
                    if (fs.existsSync('./public/picture/' + d.data[i].picture)) {
                        d.data[i].picture='picture/' + d.data[i].picture;
                    }
                    else {
                        d.data[i].picture='images/no_pic.jpg';
                    }
                }
                res.render('product_list', {items:d,search:search,url:url,label:label});  //將資料傳給顯示頁面
            }else{
                res.render('notFound');  //導向找不到頁面
            }  
        })
    }
});


//接收GET請求
router.get('/', function(req, res, next) {
    res.redirect('/product/list/1')  //將資料傳給顯示頁面
});

module.exports = router;