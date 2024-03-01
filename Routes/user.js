const{Router} = require('express')
const router = Router()
const User = require('../Models/user')

router.get('/signin',(req,res)=>{
    return res.render('signin')
})
router.get('/signup',(req,res)=>{
    return res.render('signup')
})


router.post('/signup',async(req,res)=>{
    const{fullname,email,password} = req.body
    console.log(req.body)
    await User.create({
        fullname,
        email,
        password
    })
    return res.redirect('/')

})
router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    console.log(email,password)
    try{
        const token =await User.matchPasswordGenerateToken(email,password)
        return res.cookie("token",token).redirect('/')
    }catch(error){
        return  res.render("signin",{
            error:"Incorrect email or password"
        })
    }
    
})
router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/")
})


module.exports = router