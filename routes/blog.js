const express = require("express")
const router = express.Router()
const data = require("../my-data.json")


router.get("/", (req, res, next) => {

    let query = req.query.category
    let random = Math.floor(Math.random()* data.myBlog.length)
    
        res.render("blog", {
            layout: "layout",
            title: "Blog Page",
            navBlog:true,
            
            blogs : data.myBlog,
            blogCategotries: data.blogCategotries,
            featuredBlog: data.myBlog[random]
        })
})

router.get("/")

module.exports = router;