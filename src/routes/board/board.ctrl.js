"use strict"

const output = {
    totalBoard : (req, res) =>{
        // res.render("board/totalboard",{
        //     userInfo : req.session.userInfo
        // });
        res.render("template/boardtemplate",{
            title : "메인",
            view : "board/totalboard"
        });
    },
    write : (req, res) =>{
        res.render("template/boardtemplate", {
            title : "글쓰기",
            view : "board/boardWrite"
        });
    }
}

module.exports = {
    output
}