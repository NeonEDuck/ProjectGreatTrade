'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

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

//匯出
module.exports = {login, add};