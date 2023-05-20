//1  automatically load .env files into our project
require('dotenv').config()     //config is used to load env automatically when app is started

//2 import express
const express=require('express')

//import cors   //cors connects backend port to front end port
const cors=require('cors')

//import router
const router = require('./routes/router')

//3 create server application
const server=express()

//import db
require('./db/connection')

//to store port number     //here port number is created initially before listening
const PORT=5000 

//use in server application
server.use(cors())
server.use(express.json())
server.use(router)
//route - localhost://5000   //get method at path 5000
// server.get('/',(req,res)=>{
//     res.status(200).json('E commerce service response')
// })

//4 to run server application
server.listen(5000,()=>{
    console.log('listening on port'+PORT)
})
