'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增產品資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO product (proname, amt, price, description, picture) VALUES ($1, $2, $3, $4, $5)', [newData.proname, newData.amt, newData.price, newData.description, newData.picture])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
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

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var one = async function(prono){
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

//---------------------------------------------
//執行資料庫動作的函式-傳回分頁及指定頁面的產品
//---------------------------------------------
var page = async function(pageNo){
    const linePerPage = 15;    //設定每頁資料筆數
    const navSegments = 10;    //設定導覽列顯示分頁數
    const startPage = Math.floor((pageNo-1) / navSegments) * navSegments + 1;  //計算導覽列的起始頁數

    var totalLine, totalPage;
    var result = {};

    await sql('SELECT count(*) AS cnt FROM product')
        .then((data) => {
            totalLine = data.rows[0].cnt;
            totalPage = Math.ceil(totalLine/linePerPage);   
        }, (error) => {
            totalLine = 0;
            totalPage = 0;  
        });

    await sql('SELECT * FROM product ORDER BY prono LIMIT $2 OFFSET $1', [(pageNo-1)*linePerPage, linePerPage])
        .then((data) => {
            result = {data:data.rows, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments};  
        }, (error) => {
            result = null;
        });

    return result;
}

//匯出
module.exports = {add, list, one, page};