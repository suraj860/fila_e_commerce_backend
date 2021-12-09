
const db = require("../mongo")


const service = {

    // sort the products
    async product (req , res){
        try{
            const data = await db.items.find().toArray()
            // console.log(data)
            res.send(data)
            // console.log(req.user)
        }catch(error){
            console.log(error)
        } 
    },

    // sort in ascending
    async ascending (req , res){
        try{
            const data = await db.items.find({type:req.body.typess}).sort({price:1}).toArray()   
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    async allAsc (req , res){
        try{
            const data = await db.items.find({}).sort({price:1}).toArray()   
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // sort in descending
    async descending (req , res){
        try{
            const data = await db.items.find({type:req.body.typess}).sort({price:-1}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    async allDsc (req , res){
        try{
            const data = await db.items.find({}).sort({price:-1}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // sorting shirts
    async shirtSort(req , res){
        try{
            const data = await db.items.find({type:"shirt"}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // sorting t-shirt
    async tshirtSort (req , res){
        try{
            const data = await db.items.find({type:"t-shirt"}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // sorting jeans
    async jeansSort (req , res){
        try{
            const data = await db.items.find({type:"jeans"}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // sorting shorts
    async shortsSort (req , res){
        try{
            const data = await db.items.find({type:"shorts"}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // sorting pajamas
    async pajamasSort (req , res){
        try{
            const data = await db.items.find({type:"pajamas"}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = service