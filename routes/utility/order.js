'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function(memno){
    var result = {buy:null,sell:null};
	
    console.log(memno);
    await sql('SELECT * FROM ordmaster WHERE memno=$1 ORDER BY ordno', [memno])
        .then((data) => {
            result.buy = data.rows;
        }, (error) => {
            result = null;
        });
    console.log(result);
    await sql('SELECT ordmaster.* FROM ordmaster JOIN orddetails ON ordmaster.ordno = orddetails.ordno JOIN product ON orddetails.prono = product.prono WHERE product.memno=$1 ORDER BY ordno', [memno])
        .then((data) => {            
            result.sell = data.rows;  
        }, (error) => {
            result = null;
        });
    console.log(result);
		
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

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var add = async function(newData){
    var result={};
    var masterStr = "";
    var ordmaster;
    var detailList=[];



    for (var i = 0; i < newData.data.length; i++) {
        if (i > 0) {
            masterStr += ",";
        }
        masterStr += "('"+newData.memno+"','"+newData.data[i].payno+"', to_timestamp($1 / 1000.0),'"+newData.request+"')";
    }
    masterStr += " RETURNING ordno";

    await sql('INSERT INTO ordmaster (memno, payno, orddate, request) VALUES ' + masterStr,[Date.now()])
        .then((data) => {
            ordmaster = data.rows;
            result = 0;  
        }, (error) => {
            result = -1;
        });

    if (result == 0) {
        for (var i = 0; i < ordmaster.length; i++) {
            for (var j = 0; j < newData.data[i].prono.length; j++) {
                detailList.push([ordmaster[i].ordno,newData.data[i].prono[j]]);
            }
        }
    
        await sql(format('INSERT INTO orddetails (ordno, prono) VALUES %L', detailList))
            .then((data) => {
                result = 0;  
            }, (error) => {
                result = -1;
            });
    }
		
    return result;
}

//匯出
module.exports = {list, one, add} ;