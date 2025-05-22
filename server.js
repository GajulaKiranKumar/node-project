const express=require('express')
const mongoose=require('mongoose')
const {PORT,MONGODB_URI}=require('./config/config')
const routing=require('./router/noteRoutes')
const {engine} =require('express-handlebars')
const app=express()
app.use(express.urlencoded({extended:true}))
app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.use('/api',routing)

let connectDb=async()=>{
     await mongoose.connect(MONGODB_URI)
     console.log("database")
}
connectDb()
app.get('/',(req,res)=>{
    res.render('home',{title:"home Page"})
    
})

app.listen(PORT,err=>{
    if (err) throw err;
    console.log("the server is running on 5000")
})