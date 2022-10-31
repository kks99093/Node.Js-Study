"use strict"
const User = require("../../model/User");

const output = {
    login : (req, res) =>{
        res.render("user/login");
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
    }
}

module.exports = {
    output,
    process
}