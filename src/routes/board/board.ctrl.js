"use strict"

const Board = require("../../model/Board/Board");
const url = require("url");

const output = {
    board : async (req, res) =>{
        // res.render("board/totalboard",{
        //     userInfo : req.session.userInfo
        // });
        var queryData = url.parse(req.url, true).query;
        const board = new Board();        
        const page = await board.getPageInfo(queryData);
        const boardList = await board.getBoardList(page);
        
        res.render("template/boardtemplate",{
            title : "메인",
            view : "board/board",
            boardList : boardList,
            page : page
        });
    },
    write : (req, res) =>{
        res.render("template/boardtemplate", {
            title : "글쓰기",
            view : "board/boardWrite"
        });
    }
}

const process = {
    write : async(req, res) =>{
         const board = new Board(req.body);         
         const userInfo = req.session.userInfo         
         board.body.userPk = userInfo.userPk;
         const result = await board.save();
         return res.json(result);
    }
}

module.exports = {
    output, process
}