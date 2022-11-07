"use strict"
const User = require("../../model/User/User");

const output = {
    login : (req, res) =>{
        if(req.session.userInfo != undefined){
            res.render("board/totalboard",{
                userInfo : req.session.userInfo
            });
        }else{
            res.render("user/login");
        }        
    }
}

const process = {
    doubleChk : async (req, res) =>{
        const user = new User(req.body);
        const result = await user.doubleChk();
        return res.json(result);
    },

    join : async(req, res) =>{        
        const user = new User(req.body);
        const result = await user.save();      
        return res.json(result);
    },

    login : async(req, res) =>{
        const user = new User(req.body);
        const result = await user.login(req);
        return res.json(result);
    },

    logout  : (req, res) =>{
        req.session.destroy();
        res.render("user/login");
    }
}


module.exports = {
    output,
    process
}