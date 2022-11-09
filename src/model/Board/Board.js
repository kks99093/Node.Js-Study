"use strict"

const { deleteBoard } = require("./BoardStorage");
const BoardStorage = require("./BoardStorage");

class Board{
    constructor(body){
        this.body = body;
    }

    async save(){
        const body = this.body
        try{
            const result = await BoardStorage.save(body);
            return result;

        }catch(err){            
            console.log(err);
            return {
                success : false
            }
        }
        
    }

    async getBoardList(page){
        try{
            let category = 0;
            if(this.category != undefined){
                category = this.category
            }
            const boardList = await BoardStorage.getBoardList(category, page);
            return boardList;
        }catch(err){
            console.log(err);
            return {
                success : false
            }
        }
    }

    async getPageInfo(queryData){
        let page = {
            size : 2
        }
        queryData.currentPage == undefined ? (page.currentPage = 1) : (page.currentPage = queryData.currentPage);

        try{        
            if(page == undefined){
                
            }
            const result = await BoardStorage.getTotalPage(page);
            page.totalPage = result.totalPage;
            return page;
        }catch(err){
            console.log(err)
            return {
                success : false
            }
        }
    }

    async getBoardDetail(queryData){
        const boardPk = queryData.boardPk;

        if(boardPk == undefined || boardPk == 0){
            return{
                success : false,
                msg : "해당 게시판을 찾을 수 없습니다."
            }
        }else{
            try{
                const result = await BoardStorage.getBoardDetail(boardPk);
                return result;
            }catch(err){
                return{
                    success : false,
                    msg : "오류가 발생했습니다."
                }
            }
        }
    }

    async deleteBoard(){

        const body = this.body;
        try{
            const board = await BoardStorage.getBoardDetail(body.boardPk);                
            if(board.userPk != this.userPk){                    
                return{
                    success: false,
                    msg : "해당 글의 작성자가 아닙니다."
                }
            }else{
                const result = await BoardStorage.deleteBoard(body.boardPk);
                return result;
            }                
        }catch(err){
            console.log(err)
            return{
                success : false,
                msg: "오류가 발생했습니다."
            }
        }
    }

    async update(){
        const body = this.body;
        try{
            const board = await BoardStorage.getBoardDetail(body.boardPk);                
            if(board.userPk != this.userPk){                    
                return{
                    success: false,
                    msg : "해당 글의 작성자가 아닙니다."
                }
            }else{
                const result = await BoardStorage.updateBoard(body);
                return result;
            }  

        }catch(err){
            console.log(err);
            return{
                success :false,
                msg : "오류가 발생했습니다."
            }
        }
    }


}

module.exports = Board;