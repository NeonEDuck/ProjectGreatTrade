'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
var format = require('pg-format');

//---------------------------------------------
// 使用者登入
//---------------------------------------------
var login = async function(account, password){   
    var result;

    //取得員工資料
    await sql('SELECT * FROM member WHERE account=$1 and password=$2', [account, password])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];
            }else{
                result = null;
            } 
        }, (error) => {
            result = null;
        });
    
    //回傳物件
    return result;
}

var add = async function(newData){   
    var result;
    //取得員工資料
    await sql('INSERT INTO member (memname, nickname, birth, email, backupemail, sex, account, "password", tel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [newData.memname, newData.nickname, newData.birth, newData.email, newData.backupemail, newData.sex, newData.account, newData.password, newData.tel])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
    
    //回傳物件
    return result;
}
var page = async function(newData){
    const linePerPage = 15;    //設定每頁資料筆數
    const navSegments = 10;    //設定導覽列顯示分頁數
    const startPage = Math.floor((newData.pageNo-1) / navSegments) * navSegments + 1;  //計算導覽列的起始頁數

    var totalLine, totalPage;
    var result = {};
    var label;
    console.log(newData);
    await sql(format('SELECT COUNT(*) AS cnt FROM member WHERE nickname LIKE \'%%%s%%\'',[newData.search.trim()]))
        .then((data) => {
            totalLine = data.rows[0].cnt;
            totalPage = Math.ceil(totalLine/linePerPage);   
        }, (error) => {
            totalLine = 0;
            totalPage = 0;  
        });

    await sql(format('SELECT * FROM member WHERE nickname LIKE \'%%%s%%\' ORDER BY memno LIMIT $2 OFFSET $1',[newData.search.trim()]), [(newData.pageNo-1)*linePerPage, linePerPage])
        .then((data) => {
            result = {data:data.rows, pageNo:newData.pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments};  
        }, (error) => {
            result = null;
        });

        
    if (result != null) {
        //取回protype資料
        await sql('SELECT * FROM label ORDER BY lblno')
            .then((data) => {
                label = data.rows;  
            }, (error) => {
                result = [];
            });
        result.label = label;

    }

    return result;
}

//匯出
module.exports = {login, add, page};