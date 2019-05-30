'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增付費資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO payment (payno, payname) VALUES ($1, $2)', [newData.payno, newData.payname])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {add};