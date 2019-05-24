'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var query = async function(prono){
    var result={};

    var cnt;
    
    await sql('SELECT COUNT(prono) FROM product', [prono])
        .then((data) => {
            if(data.rows.length > 0){
                cnt = data.rows[0];   
            }else{
                cnt = -1;
            }    
        }, (error) => {
            result = null;
            
        });
    cnt = 1

    await sql('INSERT INTO product (prono, proname, price, inventorydate) VALUES ($1, $2, $3, $4)', [cnt, newData.proname, newData.price, newData.inventorydate])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {query};