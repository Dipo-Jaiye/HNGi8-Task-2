const express = require("express");
const layouts = require("express-ejs-layouts");
const {renderFile} = require("ejs");
const nodemailer = require("nodemailer");
const {port, PORT, EmailHost, EmailPassword, EmailPort, EmailUsername} = require("./config");
const app = express();
const appPort = port || PORT || 3000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(layouts);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.get("/",(req,res)=>{
    res.render("index");
});
app.post("/contact", async (req,res)=>{
    const {name, email, message, phone } = req.body;
    const transport = nodemailer.createTransport({
        host: EmailHost,
        port: EmailPort,
        auth: {
            user: EmailUsername,
            pass: EmailPassword
        }
    });
    // verify connection configuration
    transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
    const contactBody = await renderFile("./views/contact.ejs",{
        name,
        email,
        message,
        phone
    });
    await transport.sendMail({
        from: `"${email}" ${EmailUsername}`,
        to: "durojaiyep@yahoo.co.uk",
        subject: "Contact Email",
        html: contactBody
    })
    .then(({response}) => console.log(response))
    .catch(err => {
        console.error(err.message)
        res.status(400).redirect("/")
    });

    res.status(200).redirect("/");
})
app.listen(appPort,()=>console.log(`App running on port ${appPort}`));