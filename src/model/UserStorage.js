"use strict";

const { resolveInclude } = require("ejs");
const db = require("../config/db");

class UserStorage{
    
    static getUserInfo(userId){               
        return new Promise((resolve, reject) =>{
            const queryStr = " SELECT * FROM basicboard.userinfo WHERE userId = ? "; 
            db.query(queryStr, [userId], (err,data) =>{
                if(err) reject(`${err}`);  
                resolve(data[0]);
            })
        })        
    }

    static save(userInfo){
        return new Promise((resolve, reject) =>{
            const queryStr = " INSERT INTO basicboard.userinfo ( userId, password, name ) VALUES ( ?, ?, ? ) ";
            db.query(queryStr, [userInfo.userId, userInfo.password, userInfo.name], (err)=>{
                if(err) reject(`${err}`);
                resolve({ success : true});
            })
        })
    }


}

module.exports = UserStorage;