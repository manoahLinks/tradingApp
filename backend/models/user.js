require('dotenv').config()
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport')

const userSchema = new mongoose.Schema({

    email: {type: String, unique: true },
    password: {type: String},
    accountBalance: {type: Number, default: 0},
    verificationCode: {type: Number},
    resetCode: {type: String},
    resetCodeExpiry: {type: Date},
    isAdmin: {type: Boolean, default: false},
    isVerified: {type: Boolean, default: false}
})

userSchema.statics.signup = async function (email, password, verificationCode) {

    if(!email || !password) {
        throw Error('All fields are required')
    }

    if(password.length < 8){
        throw Error('password must be atleast 8 characters long')
    }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error ('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, verificationCode})

    return user
}


userSchema.statics.login = async function (email, password) {

    // validation
    if(!email || !password){
       throw Error('All fields must be filled')
   }

//    if (email == 'annabellesgirl@gmail.com') {
//         throw Error("Account Locked: Your account has been temporarily locked due to multiple failed withdrawal attempts. Please wait until it is resolved before trying again, or contact the company manager if you need immediate assistance via WhatsApp ‪+1 (858) 396‑4024‬. If error persists reach out to us by sending an email to uresarlana@gmail.com ")
//     }


   const user = await this.findOne({email})

   if(!user){
       throw Error('Incorrect email')
   }

   const match = await bcrypt.compare(password, user.password)

   if(!match){
       throw Error('Incorrect password')
   }

   return user

}

// send Alumni and email function
userSchema.statics.sendEmail = async function(email, subject, message) {
    let transport = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        secure: false,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        debug: true 
    })

    const info = await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: message

    }, (err, sent) => {
        err ? console.log('error send email', err) : console.log('succesfully sent', sent)

    })
}

const User = mongoose.model('user', userSchema)

module.exports = User;