const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const sessionOption = {
    secret:"akashkiscreatkey",
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionOption));
app.use(flash());


app.get("/register" ,(req,res)=>{
    let {name = "anonymous"} = req.query;
   req.session.name = name;
   req.flash("success" , "New user create successfully");
   res.redirect("/hello");
});

app.get("/hello" , (req ,res) => {
  res.render("index.ejs",{name : req.session.name,msg : req.flash("success")});
})

// app.get("/test", (req,res) => {
//     res.send("test succesfully");
// })

// app.get("/getsessioncount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }

//     res.send(`you send a request ${req.session.count} times `);
// });


app.listen(3000,() => {
    console.log("port is listening to 3000");
});