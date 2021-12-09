

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mailService = require("../mailer")
const db = require("../mongo")


const loginModule={

    // register new user 
    async register (req , res){
        try{
            const data = await db.userData.findOne({email: req.body.email});
            if (data){
                res.send({message : "Email already registered"})
            }else{
                const salt = await bcrypt.genSalt()
                req.body.password = await bcrypt.hash(req.body.password , salt)
                await db.userData.insertOne({...req.body , cart:[] , wishList:[] , status: "pending"})
                await mailService.verifymailer(req.body)
                res.send({message:"user registered successfully"})
            }
        }catch(error){
            console.log(error)
        }
    },

    // user Login
    async userLogin(req , res){
        try{
            const user = await db.userData.findOne({email: req.body.email})
            if(!user){
                res.send({message : "Enter valid EmailId"})
            }
             // check for the email-verification if pending
            // tell user to verify the mail
            else if(user && user.status==="pending"){
                return res.send({message : "please verify your Email, check your MailBox"})
            }
            else{
                const isValid = await bcrypt.compare(req.body.password , user.password)
                if(isValid){
                    const authToken = jwt.sign({user_id : user._id , email:user.email ,name : user.name},
                         "admin123" , {expiresIn:"24h"})
                    res.send({authToken , message:"logged in successfully"})
                }else{
                    res.send({message:"Entered password is wrong"})
                }
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = loginModule ;