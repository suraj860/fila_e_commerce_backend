
const db = require("../mongo")

const service ={
    // verify user email addresss
    async verifyMail(req , res){
        try{
            const data =  await db.userData.findOne({verifyToken:req.params.id})
            if(data){
                await db.userData.findOneAndUpdate({email:data.email},{$set:{status:"verified" , verifyToken : undefined}})
                res.send({message : "you account is verified"})
            }else{
                res.send({message : "something went wrong or link is expired"} )
            }
        }catch(error){
            console.log(error)
        }
       
    }
}

module.exports = service;