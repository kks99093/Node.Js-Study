"use strict"

const title = document.querySelector("#title"),
    content = document.querySelector("#content"),
    write_btn = document.querySelector("#write_btn");


write_btn.addEventListener("click", writeProc);

function writeProc(){
    const boardPk = document.querySelector("#boardPk");
    let data = {
        title : title.value,
        content : content.value,
    }
    let addr = ""
    if(boardPk != undefined){
        data.boardPk = boardPk.value
        addr = "/board/updateProc"
    }else{
        addr = "/board/writeProc"
    }
    fetch(addr,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        if(res.success){
            alert("성공적으로 등록 되었습니다.")
            location.href = "/";
        }else{
            alert("글을 등록하지 못했습니다.");
            return;
        }
    })
}