'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

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
    return result;
}

//---------------------------------------------
//執行資料庫動作的函式-傳回分頁及指定頁面的產品
//---------------------------------------------

var edit = async function(newData){
    var results;
    
    await sql('UPDATE member SET memname=$1, nickname=$2, sex=$3, password=$4, picture=$5, backupemail=$6, tel=$7, address=$8, birth=$9 WHERE memno = $6', [newData.proname, newData.amt, newData.price, newData.description, newData.picture, newData.memno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
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

var report = async function(memno){
    var results;

    await sql('INSERT INTO impeach (prono, memno, content) VALUES ($1, $2, $3)', [newData.prono, newData.memno, newData.content])
}

//匯出
module.exports = {one, edit, remove, report};