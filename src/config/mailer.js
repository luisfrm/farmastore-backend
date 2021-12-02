const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'luisfrm.xd@gmail.com', // generated ethereal user
    pass: 'gtzlwytlkcvqbtxz', // generated ethereal password
  },
});

transporter.verify().then(()=>{
  console.log("Ready for sending email")
})