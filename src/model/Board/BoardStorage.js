"use strict"
const db = require("../../config/db");

class BoardStorage{

    static save(boardInfo){
        return new Promise((resolve, reject) =>{
            const queryStr = " INSERT INTO basicboard.board ( title, content, userPk) VALUES (?, ?, ?) ";
            db.query(queryStr, [boardInfo.title, boardInfo.content, boardInfo.userPk], (err)=>{
                if(err)reject(`${err}`);
                resolve({ success : true});
            })
        })
    }

    static getBoardList(category, page){
        return new Promise((resolve, reject) =>{
            const queryStr = " SELECT A.boardPk, A.title, DATE_FORMAT(A.createDate, '%y-%m-%d-%T') as createDate, B.name FROM basicboard.board A "
            + " INNER JOIN basicboard.userinfo B "
            + " ON A.userPk = B.userPk "
            + " ORDER BY createDate DESC "
            + " LIMIT "+ (page.currentPage - 1)*page.size +","+page.size;
            console.log(queryStr);
            db.query(queryStr, [], (err, data)=>{
                if(err)reject(`${err}`);
                resolve(data);
            })
        })
    }

    static getTotalPage(page){
        return new Promise((resolve, reject) => {
            const queryStr = " SELECT CEIL(count(*)/"+page.size+") as totalPage FROM basicboard.board ";
            db.query(queryStr, [], (err, data) =>{
                if(err)reject(`${err}`);
                resolve(data[0]);
            })
        })
    }

    static getBoardDetail(boardPk){
        const queryStr = " SELECT * FROM basicboard.board WHERE boardPk = ? ";
        return new Promise((resolve, reject)=>{
            db.query(queryStr, [boardPk], (err, data) =>{
                if(err)reject(`${err}`);
                resolve(data[0]);
            })
        })

    }

    static deleteBoard(boardPk){
        const queryStr = " DELETE FROM basicboard.board WHERE boardPk = ? ";
        return new Promise((resolve, reject) => {
            db.query(queryStr, [boardPk], (err) => {
                if(err)reject(`${err}`);
                resolve ({ success : true })
            })
        })
    }

    static updateBoard(boardInfo){
        const queryStr = " UPDATE basicboard.board SET title = ?, content = ? WHERE boardPk = ? ";
        return new Promise((resolve, reject) => {
            db.query(queryStr, [boardInfo.title, boardInfo.content, boardInfo.boardPk], (err) =>{
                if(err)reject(`${err}`);
                resolve({ success : true})
            })
        })
    }

}

module.exports = BoardStorage;