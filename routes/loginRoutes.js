
const route = require("express").Router()
const service = require("../modules/loginModules")

route.post("/register" , service.register)
route.post("/login" , service.userLogin)

module.exports = route ; 