'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

var getPayment = async function(memno){
    var result={};
    
    await sql('SELECT * FROM payment')
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });
    return result;
}

var one = async function(memno){
    var result={};
    
    await sql('SELECT * FROM member WHERE memno = $1', [memno])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
    if (result != null && result != -1) {
        await sql('SELECT payment.* FROM mempayment JOIN payment ON mempayment.payno=payment.payno WHERE mempayment.memno = $1', [memno])
            .then((data) => {
                result.payment = data.rows;
            }, (error) => {
                result.payment = null;
            });
        await sql('SELECT * FROM product WHERE memno = $1 ORDER BY prono DESC LIMIT 3', [memno])
            .then((data) => {
                result.product = data.rows;
            }, (error) => {
                result.product = null;
            });
    }
    return result;
}

//---------------------------------------------
//執行資料庫動作的函式-傳回分頁及指定頁面的產品
//---------------------------------------------

var edit = async function(newData){
    var results;
    var list = [];
    console.log(newData)
    await sql('UPDATE member SET memname=$1, nickname=$2, sex=$3, email=$4, backupemail=$5, tel=$6, address=$7, birth=$8, picture=$9 WHERE memno = $10', [newData.memname, newData.nickname, newData.sex, newData.email, newData.backupemail, newData.tel, newData.address, newData.birth, newData.picture, newData.memno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
    if (results > 0) {
        for (var i = 0; i < newData.payno.length; i++) {
            list.push([newData.memno,newData.payno[i]])
        }
        await sql('DELETE FROM mempayment WHERE memno = $1', [newData.memno])
        console.log(format('INSERT INTO mempayment VALUES %L', list))
        await sql(format('INSERT INTO mempayment VALUES %L', list))
    }
		
    return results;
}

var remove = async function(memno){
    var results;
    
    await sql('DELETE FROM mempayment WHERE memno = $1', [memno])
    await sql('DELETE FROM orddetails WHERE memno = $1', [memno])
    await sql('DELETE FROM ordmaster WHERE memno = $1', [memno])
    await sql('DELETE FROM feedback WHERE memno = $1', [memno])
    await sql('DELETE FROM comment WHERE memno = $1', [memno])
    await sql('DELETE FROM impeach WHERE memno = $1', [memno])
    await sql('DELETE FROM member WHERE memno = $1', [memno])
    await sql('DELETE FROM product WHERE memno = $1', [memno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}

var report = async function(newData){
    var results;
console.log(newData.memno, newData.rptcontent, Date.now())
    await sql('INSERT INTO report (memno, content, "date") VALUES ($1, $2, to_timestamp($3 / 1000.0))', [newData.memno, newData.rptcontent, Date.now()])
        .then((data) => {
            results = 0;  
        }, (error) => {
            results = -1;
        });

    return results;
}

//匯出
module.exports = {getPayment, one, edit, remove, report};