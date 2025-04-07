const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// NewUser Schema for registration
const newUserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  roles: {
    type: Array,
    default: ['user']
  }
});

// Add passport-local-mongoose to our Schema
newUserSchema.plugin(passportLocalMongoose);

// Pass the Schema into Mongoose to use as our model
const NewUser = mongoose.model("NewUser", newUserSchema);
module.exports = NewUser;
