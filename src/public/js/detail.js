"use strict"

const update_btn = document.querySelector("#update_btn"),
    delete_btn = document.querySelector("#delete_btn"),
    boardPk = document.querySelector("#boardPk");

update_btn.addEventListener("click", updateBoard);
delete_btn.addEventListener("click", deleteBoard);

function deleteBoard(){
    const data = {
        boardPk : boardPk.value
    }
    fetch("/board/deleteProc",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((res) =>{
        if(res.success){
            alert("삭제에 성공 했습니다.")
            location.href = "/";
        }else{
            alert("삭제에 실패 했습니다.")
            return
        }
    })
}

function updateBoard(){
    location.href = "/board/write?boardPk="+boardPk.value;
}