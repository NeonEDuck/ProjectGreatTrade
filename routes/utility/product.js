'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增產品資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO product (proname, price, label, description, paymethod, picture) VALUES ($1, $2, $3, $4, $5)', [newData.price, newData.label, newData.description, newData.paymethod, newData.picture])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {add};