const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // region: {
    //     type: String,
    //     // required: true
    // },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    publicKey:{
        type: String
    }
  });

  const User = mongoose.model('User', userSchema, 'users');

  module.exports={User}