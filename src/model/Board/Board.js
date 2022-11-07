"use strict"

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
        console.log(queryData);
        let page = {
            size : 2
        }
        queryData.currentPage == undefined ? (page.currentPage = 1) : (page.currentPage = queryData.currentPage);

        console.log(page);
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

}

module.exports = Board;