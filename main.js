const express = require("express");
const layouts = require("express-ejs-layouts");
const {port, PORT} = require("./config");
const app = express();
const appPort = port || PORT || 3000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(layouts);
app.get("/",(req,res)=>{
    res.render("index");
})
app.listen(appPort,()=>console.log(`App running on port ${appPort}`));