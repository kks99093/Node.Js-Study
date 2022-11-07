"use strict"

const UserStorage = require("./UserStorage");

class User{
    constructor(body){
        this.body = body;
    }

    async doubleChk(){
        const body = this.body       
        try{
            const result = await UserStorage.getUserInfo(body.userId);
            if(result === undefined){
                return {
                    doubleChk : true
                }
            }else{
                return {
                    doubleChk : false
                }
            }            
        }catch( err){  
            console.log(err)
        }
    }

    async save(){
        const body = this.body        
        try{
            const result = await UserStorage.save(body);
            return result;
        }catch(err){
            console.log(err);
            return {
                success : false            
            }        
        }
    
    }

    async login(req){
        const body = this.body        
        try{
            const userInfo = await UserStorage.getUserInfo(body.userId);
            if(userInfo === undefined || body.psword != userInfo.password){
                return {
                    success : true,
                    state : 0
                }
            }else {
                userInfo.password = "";
                req.session.userInfo = userInfo;
                return{
                    success : true,
                    state : 1,
                }                
            }
        }catch(err){
            console.log(err);
            return{
                success : false
            }
        }
    }

}

module.exports = User;