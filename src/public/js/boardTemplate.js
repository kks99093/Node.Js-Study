"use strict"

const writeBtn = document.querySelector("#writeBtn");

writeBtn.addEventListener("click", writePage); 
function writePage(){
    location.href = "/board/write";
}