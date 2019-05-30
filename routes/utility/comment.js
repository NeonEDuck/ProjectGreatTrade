'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

//------------------------------------------
//執行資料庫動作的函式-新增產品資料
//------------------------------------------
var add = async function(newData){
    var result;
    console.log(newData)
    await sql('INSERT INTO comment (prono, cmtcontent, memno, cmtdate) VALUES ($1, $2, $3, to_timestamp($4 / 1000.0))', [newData.prono, newData.cmtcontent, newData.memno, Date.now()])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });

		
    return result;
}

var reply = async function(newData){
    var result;
    console.log(newData)
    await sql('UPDATE comment SET rspcontent=$1, rspdate=to_timestamp($2 / 1000.0) WHERE cmtno = $3', [newData.rspcontent, Date.now(), newData.cmtno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            result = -1;
        });

		
    return result;
}

//匯出
module.exports = {add, reply};