const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch (e) {
        next(e);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
      return await bcrypt.compare(newPassword,this.password);
  }catch (e) {
      throw new Error(e);
  }
};

const User = mongoose.model('user',userSchema);

module.exports = User;