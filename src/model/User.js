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
            const result = await UserStorage.save(this.body);
            return result;
        }catch(err){
            console.log(err);
            return {
                success : false            
            }        
        }
    
    }

}

module.exports = User;