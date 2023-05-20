//import mongoose
const mongoose = require('mongoose')

//to bring connection string in .env
const db= process.env.DATABASE 

//connect with mongoose
mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser: true
}).then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log(err);
})