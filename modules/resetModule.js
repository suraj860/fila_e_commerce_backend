


const bcrypt = require("bcrypt")
const mailService = require("../mailer")
const db = require("../mongo")

const resetPassword = {

    // resetting email of user
    async resetting (req , res){
        try{
            const data = await db.userData.findOne({email: req.body.email})
            if (data){
                await mailService.resetmailer(req.body)
                res.send({message:"check your mail"})
            }else{
                res.send("Entered emailid is wrong")
            }

        }catch(error){
            console.log(error)
        }
    },

    // updating user new password
    async updatePassword (req , res){
        try{
            const salt = await bcrypt.genSalt()
            req.body.newpassword = await bcrypt.hash(req.body.newpassword , salt)
            const data = await db.userData.findOne ({verifyToken : req.body.tk})
            if(data){
                await db.userData.findOneAndUpdate({email:data.email} ,{$set:{password:req.body.newpassword , verifyToken : undefined}})
                return res.send({message:"Password resetted successfully"})
            }else{
                return res.send({message:'check your link'})
            }
        }catch(error){
            console.log(error)
        }
    }

}

module.exports = resetPassword;