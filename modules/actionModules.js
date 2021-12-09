
const db = require("../mongo")
const { ObjectId } = require("bson")

const service = {

    // cancel final order
    async cancelFinal_order (req , res){
        try{
            await db.orders.deleteOne({_id:ObjectId(req.body.id)})
            res.send("item deleted")
        }catch(error){
            console.log(error)
        }
    },

    // get all orders placed by the user
    async getOrders (req , res){
        try{
            const data = await db.orders.find({userId:req.user.user_id}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // insert the order of the user
    async orders (req, res){
        try{
            await db.orders.insertOne(req.body)
            res.send({message :"Your order got placed"})
        }catch(error){
            console.log(error)
        }
        
    },

    // get cart items of the user
    async getCart (req , res){
        try{
            const data = await db.userData.findOne({_id :ObjectId(req.user.user_id)})
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // add product to the cart
    async addCart (req , res){
        try{
            const data = await db.userData.findOneAndUpdate({_id: ObjectId(req.user.user_id)},
            {$push:{cart:{...req.body , userId: req.user.user_id , cartId: ObjectId()}}}, {returnDocument: "after"})
            res.send(data.value)
        }catch(error){
            console.log(error)
        }
    },

    // remove product from the cart
    async removeCart (req , res){
        try{
            const data = await db.userData.findOneAndUpdate({_id: ObjectId(req.user.user_id)},
            {$pull:{cart:{cartId : ObjectId(req.body.cartId)}}}, {returnDocument:"after"})
            res.send(data.value)
        }catch(error){
            console.log(error)
        }
    },

    // add product to the wishlist of the user
    async wishlist (req , res){
        try{
            const data = await db.userData.findOneAndUpdate({_id: ObjectId(req.user.user_id)},
            {$push:{wishList:{...req.body , wishId: ObjectId()}}}, {returnDocument: "after"})
            res.send(data.value)
        }catch(error){
            console.log(error)
        }     
    },

    // remove order from user wishList
    async removewishlist (req , res){
        try{
            const data = await db.userData.findOneAndUpdate({_id: ObjectId(req.user.user_id)},
            {$pull:{wishList:{wishId: ObjectId(req.body.wishId)}}}, {returnDocument: "after"})
            res.send(data.value)
        }catch(error){
            console.log(error)
        }     
    }
}

module.exports = service