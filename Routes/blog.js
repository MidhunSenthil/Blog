const{Router} = require('express')
const router = Router()
const multer = require('multer')
const path = require('path')
const blog = require('../Models/blog')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
router.get('/add-new',(req,res)=>{
    return res.render("addblog",{
        user:req.user
    })
})

router.post('/',upload.single('coverImage'),async (req,res)=>{
    const{title,body} = req.body
    const Blog = await blog.create({
        body,
        title,
        createBy : req.user._id,
        coverImageUrl: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

module.exports = router