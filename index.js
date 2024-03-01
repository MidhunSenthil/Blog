require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose= require('mongoose')
const cookieparser = require('cookie-parser')
const Blog  = require('./Models/blog')
const userRoute = require('./Routes/user')
const blogRoute = require('./Routes/blog')
const { checkForAuthentication } = require('./middleware/authentication')
const app = express()

const PORT = process.env.PORT

mongoose.connect(process.env.MONGOURL)
.then(()=>console.log("database connected"))
app.set('view engine','ejs')

app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}))
app.use(cookieparser())
app.use(checkForAuthentication("token"))
app.use(express.static(path.resolve('./public')))

app.get('/',async (req,res)=>{
    const allblogs = await Blog.find({})
    res.render('home',{
        user: req.user,
        blogs: allblogs
    })
})
app.use('/user',userRoute)
app.use('/blog',blogRoute)


app.listen(PORT,()=>{
    console.log("Server is listening")
})