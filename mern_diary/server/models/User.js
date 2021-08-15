const mongoose = require('mongoose')
const diary = require('./Diary') 

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        max:10,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max:30,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min:6,
        unique: true
    },
    // diary: [diary]
}, 
{timestamps: true}
)

module.exports = mongoose.model('User',UserSchema)