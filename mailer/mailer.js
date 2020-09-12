const nodemailer = require('nodemailer');


    const mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'lamont.steuber91@ethereal.email',
            pass: 'Ga3TSqT4P7KFGp5vgR'
        }
    }

   
module.exports= nodemailer.createTransport(mailConfig);