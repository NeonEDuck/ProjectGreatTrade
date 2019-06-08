var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');
const fs = require('fs')

//接收GET請求
router.get('/', function(req, res, next) {
    if (req.session.user != null && req.session.user != undefined){
        order.list(req.session.user).then(data => {
            if(data==null){
                res.render('error');  //導向錯誤頁面
            }else{
                
                for (var i = 0; i < data.buy.length; i++) {
                    var d = new Date(data.buy[i][0].orddate);
                    data.buy[i][0].orddate = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    if (data.buy[i][0].nickname.length > 3) {
                        data.buy[i][0].nickname = data.buy[i][0].nickname.slice(0,3) + "..";
                    }
                    for (j = 0; j < data.buy[i].length; j++) {
                        var d = new Date(data.buy[i][j].date);
                        data.buy[i][j].date = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                        if (fs.existsSync('./public/picture/' + data.buy[i][j].picture)) {
                            data.buy[i][j].picture='picture/' + data.buy[i][j].picture;
                        }
                        else {
                            data.buy[i][j].picture='images/no_pic.jpg';
                        }
                    }
                }
                for (var i = 0; i < data.sell.length; i++) {
                    var d = new Date(data.sell[i][0].orddate);
                    data.sell[i][0].orddate = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    if (data.sell[i][0].nickname.length > 3) {
                        data.sell[i][0].nickname = data.sell[i][0].nickname.slice(0,3) + "..";
                    }
                    for (j = 0; j < data.sell[i].length; j++) {
                        var d = new Date(data.sell[i][j].date);
                        data.sell[i][j].date = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                        if (fs.existsSync('./public/picture/' + data.sell[i][j].picture)) {
                            data.sell[i][j].picture='picture/' + data.sell[i][j].picture;
                        }
                        else {
                            data.sell[i][j].picture='images/no_pic.jpg';
                        }
                    }
                }
                res.render('order_show', {items:data});  //將資料傳給顯示頁面
            }
        })
    }
    else {
        res.render('login_form', {message:'請先登入以檢視您的訂單'});
    }
});

module.exports = router;