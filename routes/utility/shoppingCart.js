'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

var one = async function(prono){
    var result={};
    if (prono == undefined || prono == null || prono == '' || prono.length == 0) {
        prono = [[null]];
    }
    else if (Array.isArray(prono)) {
        prono = [prono]
    }
    else {
        prono = [[prono]]
    }
    await sql(format('SELECT product.*,member.nickname FROM product JOIN member ON member.memno=product.memno WHERE product.prono IN %L', prono))
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows;
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });

    console.log(format('SELECT product.*,member.nickname FROM product JOIN member ON member.memno=product.memno WHERE product.prono IN %L', prono))        
    if (result != null && result != -1) {
        var memList = [];
        var payList = [];
        for (var i = 0; i < result.length; i++) {
            result[i].payment = [];
            if (!memList.includes(result[i].memno)) {
                memList.push(result[i].memno);
            }
        }
        memList = [memList];
        
        await sql(format('SELECT mempayment.*,payment.payname FROM mempayment JOIN payment ON payment.payno=mempayment.payno WHERE mempayment.memno IN %L', memList))
            .then((data) => {
                console.log(data.rows);
                if(data.rows.length > 0){
                    payList = data.rows;
                }
            }, (error) => {
            });
                
        for (var i = 0; i < payList.length; i++) {
            for (var j = 0; j < result.length; j++) {
                var _co = {payno:payList[i].payno, payname:payList[i].payname};
                if (result[j].memno == payList[i].memno && !result[j].payment.includes(_co)) {
                    result[j].payment.push({payno:payList[i].payno,payname:payList[i].payname});
                }
            }
        }
    }

    return result;
}
//匯出
module.exports = {one};