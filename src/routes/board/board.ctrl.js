"use strict"

const Board = require("../../model/Board/Board");
const url = require("url");

const output = {
    board : async (req, res) =>{
        if(!loginChk(req)){
            res.redirect("/user/login");
        }
        var queryData = url.parse(req.url, true).query;
        const board = new Board();        
        const page = await board.getPageInfo(queryData);
        const boardList = await board.getBoardList(page);
        
        res.render("template/boardtemplate",{
            title : "메인",
            view : "board/board",
            boardList : boardList,
            page : page,
            userInfo : req.session.userInfo
        });
    },
    write : async (req, res) =>{
        if(!loginChk(req)){
            res.redirect("/user/login");
        }
        var queryData = url.parse(req.url, true).query;        
        if(queryData.boardPk == undefined){
            const boardDetail = undefined;
            res.render("template/boardtemplate", {
                title : "글쓰기",
                view : "board/boardWrite",
                boardDetail, undefined,
                userInfo : req.session.userInfo
            });
        }else{
            const board = new Board();
            const boardDetail = await board.getBoardDetail(queryData);
            res.render("template/boardtemplate", {
                title : "글수정",
                view : "board/boardWrite",
                boardDetail, boardDetail,
                userInfo : req.session.userInfo
            });
        }
        
    },
    detail : async(req, res) =>{
        if(!loginChk(req)){
            res.redirect("/user/login");
        }
        const queryData = url.parse(req.url, true).query;
        const board = new Board();
        const boardDetail = await board.getBoardDetail(queryData);
        if(boardDetail.success == undefined){
            res.render("template/boardtemplate", {
                title : "상세 페이지",
                view : "board/boardDetail",
                boardDetail : boardDetail,
                userPk : req.session.userInfo.userPk,
                userInfo : req.session.userInfo
            })            
        }else{
            res.render("err", {
                msg : boardDetail.msg
            })
        }
        
    }
}

const process = {
    write : async(req, res) =>{
         const board = new Board(req.body);         
         const userInfo = req.session.userInfo         
         board.body.userPk = userInfo.userPk;
         const result = await board.save();
         return res.json(result);
    },

    delete : async(req, res) =>{
        const board = new Board(req.body);
        board.userPk = req.session.userInfo.userPk;
        const result = await board.deleteBoard();
        return res.json(result);
    },

    update : async(req, res) =>{
        const board = new Board(req.body);
        board.userPk = req.session.userInfo.userPk;
        const result = await board.update();
        return res.json(result);
    }
}


function loginChk(req) {
    if(req.session.userInfo == undefined){
        return false;
    }else{
        return true;
    }
}

module.exports = {
    output, process
}

