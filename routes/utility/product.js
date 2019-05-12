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

var query = async function(prono){
    var result={};
    
    await sql('SELECT * FROM product WHERE prono = $1', [prono])
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

var list = async function(){
    var result=[];
	
    await sql('SELECT * FROM product ORDER BY prono')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

var remove = async function(prono){
    var result;

    await sql('DELETE FROM product WHERE prono = $1', [prono])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {add};
module.exports = {remove};
module.exports = {list};
module.exports = {query};