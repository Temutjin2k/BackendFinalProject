const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

function MailHandler(req, res){
    try {
        const {to, subject, text} = req.body

        if (!to || !subject || !text){
            res.status(400).json({error: "to, subject or text is missing"})
            return
        }

        const mailOptions = {
            from: 'tamutdzhin@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({error: "Error sending email"})
                console.log('Error:', error);
                return
            } else {
                console.log('Email sent:',  mailOptions);
            }
        });

        res.json({message: "Email has been sent successfully"})
    } catch (err) {
        console.error('Error:', err);
    }
}

module.exports = MailHandler