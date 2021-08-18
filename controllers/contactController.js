const {renderFile} = require("ejs");
const nodemailer = require("nodemailer");
const {EmailHost, EmailPassword, EmailPort, EmailUsername} = require("../config");

module.exports = async (req, res) => {
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
  
    // generate html for email body with ejs
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
        // respond with failure
        res.status(400).send(err.message);
    });

    // respond with success
    res.status(200).end();
}