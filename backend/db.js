const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kushallunkad456:hmxwhmvU5KShB6Ra@cluster0.gsq6ibf.mongodb.net/paytm")

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String
})

// Create a Schema for Users
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     }
// });


const accountSchema = mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,  //string
    balance : Number
})

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports = {
    User,
    Account,
};

