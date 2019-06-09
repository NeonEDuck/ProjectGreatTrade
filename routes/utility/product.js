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

    console.log(newData)

    await sql('INSERT INTO product (proname, amt, price, description, picture, memno, "date") VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING prono', [newData.proname, newData.amt, newData.price, newData.description, newData.picture, newData.memno])
        .then((data) => {
            prono = data.rows[0].prono;
            result = 0;  
        }, (error) => {
            result = -1;
        });
        
    for (var i = 0; i < newData.lblno.length; i++) {
        list.push([prono,newData.lblno[i]])
    }
    console.log(format('INSERT INTO prolabel (prono, lblno) VALUES %L', list))

    if (result == 0 && list.length > 0 && list != [[null]]) {
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
var one = async function(newData){
    var result={};
    
    await sql('SELECT * FROM product WHERE prono = $1', [newData.prono])
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
        result.likes = 0;
        sql('SELECT count(*) FROM likes WHERE prono = $1', [newData.prono])
            .then((data) => {
                result.likes = data.rows[0].count;
                result.likesyes = '0';
                sql('SELECT count(*) FROM likes WHERE prono = $1 AND memno = $2', [newData.prono, newData.memno])
                    .then((data) => {
                        result.likesyes = data.rows[0].count;
                    }, (error) => {
                        result.likesyes = '0';
                    });
            }, (error) => {
                result.likes = null;
            });
        await sql('SELECT member.memname,member.nickname,member.picture FROM product JOIN member ON product.memno = member.memno WHERE prono = $1', [newData.prono])
            .then((data) => {
                if(data.rows.length > 0){
                    result.member = data.rows[0];
                }else{
                    result.member = -1;
                }    
            }, (error) => {
                result.member = null;
            });
        await sql('SELECT label.* FROM product JOIN prolabel ON product.prono = prolabel.prono JOIN label ON prolabel.lblno = label.lblno WHERE product.prono = $1', [newData.prono])
            .then((data) => {
                if(data.rows.length > 0){
                    result.label = data.rows;
                }else{
                    result.label = -1;
                }    
            }, (error) => {
                result.label = null;
            });
        await sql('SELECT payment.* FROM mempayment JOIN payment ON mempayment.payno=payment.payno JOIN product ON product.memno=mempayment.memno WHERE product.prono = $1', [newData.prono])
            .then((data) => {
                if(data.rows.length > 0){
                    result.payment = data.rows;
                }else{
                    result.payment = -1;
                }    
            }, (error) => {
                result.payment = null;
            });
        await sql('SELECT comment.*,member.memname,member.nickname FROM member JOIN comment ON member.memno = comment.memno WHERE comment.prono = $1', [newData.prono])
            .then((data) => {
                if(data.rows.length > 0){
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
var page = async function(newData){
    const linePerPage = 15;    //設定每頁資料筆數
    const navSegments = 10;    //設定導覽列顯示分頁數
    const startPage = Math.floor((newData.pageNo-1) / navSegments) * navSegments + 1;  //計算導覽列的起始頁數

    var totalLine, totalPage;
    var result = {};
    var label;
    console.log(newData);
    if (newData.label.length != 0){
        await sql(format('SELECT COUNT(product.*) AS cnt FROM product WHERE product.prono IN (SELECT product.prono FROM product JOIN prolabel ON prolabel.prono=product.prono WHERE product.proname LIKE \'%%%s%%\' AND prolabel.lblno IN %L)',newData.search.trim(),[newData.label]))
            .then((data) => {
                totalLine = data.rows[0].cnt;
                totalPage = Math.ceil(totalLine/linePerPage);   
            }, (error) => {
                totalLine = 0;
                totalPage = 0;  
            });
        await sql(format('SELECT product.* FROM product WHERE product.prono IN (SELECT product.prono FROM product JOIN prolabel ON prolabel.prono=product.prono WHERE product.proname LIKE \'%%%s%%\' AND prolabel.lblno IN %L) LIMIT $2 OFFSET $1',newData.search.trim(),[newData.label]), [(newData.pageNo-1)*linePerPage, linePerPage])
            .then((data) => {
                result = {data:data.rows, pageNo:newData.pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments};  
            }, (error) => {
                result = null;
            });
    }
    else {
        await sql(format('SELECT COUNT(*) AS cnt FROM product WHERE proname LIKE \'%%%s%%\'',newData.search.trim()))
            .then((data) => {
                totalLine = data.rows[0].cnt;
                totalPage = Math.ceil(totalLine/linePerPage);   
            }, (error) => {
                totalLine = 0;
                totalPage = 0;  
            });
        await sql(format('SELECT * FROM product WHERE proname LIKE \'%%%s%%\' LIMIT $2 OFFSET $1',newData.search.trim()), [(newData.pageNo-1)*linePerPage, linePerPage])
            .then((data) => {
                result = {data:data.rows, pageNo:newData.pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments};  
            }, (error) => {
                result = null;
            });
    }

    var list = []
    for (var i = 0; i < result.data.length; i++) {
        result.data[i].label = []
        list.push(result.data[i].prono)
    }
    await sql(format('SELECT prolabel.*,label.lblname FROM product JOIN prolabel ON product.prono = prolabel.prono JOIN label ON prolabel.lblno = label.lblno WHERE product.prono IN %L', [list]))
        .then((data) => {
            if(data.rows.length > 0){
                for (var i = 0; i < data.rows.length; i++) {
                    for (var j = 0; j < result.data.length; j++) {
                        if (result.data[j].prono == data.rows[i].prono) {
                            result.data[j].label.push(data.rows[i])
                            break;
                        }
                    }
                }
            }
        }, (error) => {
        });
    console.log(result)
    
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

//---------------------------------------------
//執行資料庫動作的函式-傳回分頁及指定頁面的產品
//---------------------------------------------
var edit = async function(newData){
    var results;
    var list = [];
    
    await sql('UPDATE product SET proname=$1, amt=$2, price=$3, description=$4, picture=$5 WHERE prono = $6', [newData.proname, newData.amt, newData.price, newData.description, newData.picture, newData.prono])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
    
    for (var i = 0; i < newData.lblno.length; i++) {
        list.push([newData.prono,newData.lblno[i]])
    }

    if (results > 0) {
        await sql('DELETE FROM prolabel WHERE prono = $1', [newData.prono])
        await sql(format('INSERT INTO prolabel (prono, lblno) VALUES %L', list))
    }
		
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

var indexList = async function(){
    var result={};
    var label;
	
    await sql('SELECT * FROM product WHERE prono IN (SELECT prono as likes FROM likes GROUP BY prono ORDER BY SUM(1) DESC LIMIT 4)')
        .then((data) => {            
            result.hot = data.rows;  
        }, (error) => {
            result.hot = [];
        });

    await sql('SELECT * FROM product ORDER BY prono DESC LIMIT 4')
        .then((data) => {            
            result.new = data.rows;  
        }, (error) => {
            result.new = [];
        });
		
    await sql('SELECT * FROM label ORDER BY lblno')
        .then((data) => {
            result.label = data.rows;  
        }, (error) => {
            result.label = [];
        });

    return result;
}

var addLike = async function(newData){
    var result={};
    await sql('INSERT INTO likes VALUES ($1, $2)', [newData.prono, newData.memno])
        .then((data) => {            
            result = data.rows;
        }, (error) => {
            result = -1;
        });

    return result;
}

var removeLike = async function(newData){
    var result={};
    await sql('DELETE FROM likes WHERE prono=$1 AND memno=$2', [newData.prono, newData.memno])
        .then((data) => {            
            result = data.rows;
        }, (error) => {
            result = -1;
        });

    return result;
}

//匯出
module.exports = {getDropdownData, add, list, one, page, edit, remove, indexList, addLike, removeLike};