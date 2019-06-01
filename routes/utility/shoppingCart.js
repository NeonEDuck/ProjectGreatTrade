'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

var one = async function(prono){
    var result={};
    await sql(format('SELECT * FROM product WHERE prono = %L', prono))
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows;
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });


    return result;
}
//匯出
module.exports = {one};