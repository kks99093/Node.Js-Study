"use strict";

function detailPage(boardPk){
    location.href = "/board/detail?boardPk="+boardPk;
}

function pagemove(pageNum){
    console.log("test")
    location.href = "/board/board?currentPage="+pageNum;
}

