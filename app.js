const express = require("express")
const app = express()
const hbs = require("hbs")

app.set('views',__dirname+"/views")
app.set("view engine","hbs")

app.use(express.static(__dirname+"/static"))
hbs.registerPartials(__dirname+"/views/partials")

app.get("/",(req,res)=>{
    res.render("index",{
        layout : "layout",
        title : "Album Page"
    })
})

app.get("/contact",(req,res)=>{
    res.render("contact",{
        layout: "layout",
        title : "Contact page"
    })
})

app.listen(3000,()=>console.log("server is running on 3000"));