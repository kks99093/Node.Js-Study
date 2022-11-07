"use strict"

const title = document.querySelector("#title"),
    content = document.querySelector("#content"),
    category = document.querySelector("#category");
    write_btn = document.querySelector("#write_btn");


write_btn.addEventListener("click", writeProc);

function writeProc(){
    const data = {
        title : title.value,
        content : content.value,
        category : category.value
    }

    fetch("/board/writeProc",{
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