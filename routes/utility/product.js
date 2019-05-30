'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

var getDropdownData = async function(){
    //儲存下拉式選單資料
    var label;
    
    //取回protype資料
    await sql('SELECT * FROM label ORDER BY lblno')
        .then((data) => {
            label = data.rows;  
        }, (error) => {
            result = [];
        });
    
    //設定回傳資料    
    var result = {};
    result.label = label;

    //回傳
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-新增產品資料
//------------------------------------------
var add = async function(newData){
    var result;
    var prono;
    var list = [];

    await sql('INSERT INTO product (proname, amt, price, description, picture) VALUES ($1, $2, $3, $4, $5) RETURNING prono', [newData.proname, newData.amt, newData.price, newData.description, newData.picture])
        .then((data) => {
            prono = data.rows[0].prono;
            result = 0;  
        }, (error) => {
            result = -1;
        });
        
    for (var i = 0; i < newData.lblno.length; i++) {
        list.push([prono,newData.lblno[i]])
    }

    if (result == 0) {
        await sql(format('INSERT INTO prolabel (prono, lblno) VALUES %L', list))
            .then((data) => {
                result = 0;  
            }, (error) => {
                result = -1;
            });
    }

		
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
    if (result!=null && result!=-1){
        await sql('SELECT label.lblname FROM product JOIN prolabel ON product.prono = prolabel.prono JOIN label ON prolabel.lblno = label.lblno WHERE product.prono = $1', [prono])
            .then((data) => {
                if(data.rows.length > 0){
                    var list = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        list.push(data.rows[i].lblname);
                    }
                    result.lblname = list;
                }else{
                    result.lblname = -1;
                }    
            }, (error) => {
                result.lblname = null;
            });
        await sql('SELECT comment.*,member.memname FROM member JOIN comment ON member.memno = comment.memno WHERE comment.prono = $1', [prono])
            .then((data) => {
                if(data.rows.length > 0){
                    console.log(data.rows)
                    result.comment = data.rows;
                }else{
                    result.comment = -1;
                }    
            }, (error) => {
                result.comment = null;
            });
    }

    

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

//---------------------------------------------
//執行資料庫動作的函式-傳回分頁及指定頁面的產品
//---------------------------------------------
var edit = async function(newData){
    var results;
    
    await sql('UPDATE product SET proname=$1, amt=$2, price=$3, description=$4, picture=$5 WHERE prono = $6', [newData.proname, newData.amt, newData.price, newData.description, newData.picture, newData.prono])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}

var remove = async function(prono){
    var results;
    
    await sql('DELETE FROM propayment WHERE prono = $1', [prono])
    await sql('DELETE FROM prolabel WHERE prono = $1', [prono])
    await sql('DELETE FROM comment WHERE prono = $1', [prono])
    await sql('DELETE FROM product WHERE prono = $1', [prono])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}

//匯出
module.exports = {getDropdownData, add, list, one, page, edit, remove};