'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------

var update = async function(newData){
    var result;

    console.log(newData);
    await sql('UPDATE ordmaster SET stat=$1 WHERE ordno=$2',[newData.stat,newData.ordno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });

    return result;
}

var remove = async function(ordno){
    var result;

    console.log(ordno);
    await sql('DELETE FROM orddetails WHERE ordno=$1',[ordno])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });
    await sql('DELETE FROM ordmaster WHERE ordno=$1',[ordno])
        .then((data) => {
            result = data.rowCount;
        }, (error) => {
            result = -1;
        });

    return result;
}

var list = async function(memno){
    var result = {buy:null,sell:null};
	
    await sql('SELECT product.*, product.memno AS promemno, member.*, ordmaster.*, orddetails.amt FROM ordmaster JOIN orddetails ON ordmaster.ordno = orddetails.ordno JOIN product ON orddetails.prono = product.prono JOIN member ON product.memno=member.memno WHERE ordmaster.memno=$1 ORDER BY ordno', [memno])
        .then((data) => {
            result.buy = data.rows;
        }, (error) => {
            result = null;
        });

    await sql('SELECT product.*, product.memno AS promemno, member.*, ordmaster.*, orddetails.amt FROM ordmaster JOIN orddetails ON ordmaster.ordno = orddetails.ordno JOIN product ON orddetails.prono = product.prono JOIN member ON ordmaster.memno=member.memno WHERE product.memno=$1 AND ordmaster.stat<>\'D\' ORDER BY ordno', [memno])
        .then((data) => {            
            result.sell = data.rows;  
        }, (error) => {
            result = null;
        });

    var _buy = [];
    for (var i = 0; i < result.buy.length; i++) {
        _buy.push([result.buy[i]]);
        if (i > 0) {
            for (var j = 0; j < _buy.length-1; j++) {
                if (_buy[j][0].ordno == result.buy[i].ordno) {
                    _buy[j].push(result.buy[i]);
                    _buy.pop();
                }
            }
        }
    }
    result.buy = _buy;

    var _sell = [];
    for (var i = 0; i < result.sell.length; i++) {
        _sell.push([result.sell[i]]);
        if (i > 0) {
            for (var j = 0; j < _sell.length-1; j++) {
                if (_sell[j][0].ordno == result.sell[i].ordno) {
                    _sell[j].push(result.sell[i]);
                    _sell.pop();
                }
            }
        }
    }
    result.sell = _sell;

    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
    console.log(result.buy);
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
    console.log(result.sell);
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')

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
        masterStr += "('"+newData.memno+"','"+newData.data[i].payno+"', CURRENT_TIMESTAMP,'"+newData.data[i].request+"')";
    }
    masterStr += " RETURNING ordno";
    console.log('INSERT INTO ordmaster (memno, payno, orddate, request) VALUES ' + masterStr)

    await sql('INSERT INTO ordmaster (memno, payno, orddate, request) VALUES ' + masterStr)
        .then((data) => {
            ordmaster = data.rows;
            result = 0;  
        }, (error) => {
            result = -1;
        });
    console.log(ordmaster)

    if (result == 0) {
        for (var i = 0; i < ordmaster.length; i++) {
            for (var j = 0; j < newData.data[i].product.length; j++) {
                detailList.push([ordmaster[i].ordno,newData.data[i].product[j].prono,newData.data[i].product[j].amt]);
            }
        }
        console.log(detailList);
    
        await sql(format('INSERT INTO orddetails (ordno, prono, amt) VALUES %L', detailList))
            .then((data) => {
                result = 0;  
            }, (error) => {
                result = -1;
            });
    }
		
    return result;
}

//匯出
module.exports = {update, remove, list, one, add} ;