const express=require('express')
const app =express()
const mongoose =require('mongoose')
const PORT=5000
const {MONGOURI}=require('./keys')
//XdZDiOq4SfpTai3Q




mongoose.connect(MONGOURI,{

   // useNewUrlParser:true,
    //useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error to mong",err)
})
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("server is running",PORT)
}) 