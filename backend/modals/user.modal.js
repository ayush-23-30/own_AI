import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from  "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email :  {
    type : String, 
    required : true, 
    unique : true, 
    trim : true, 
    lowercase : true, 
    minLength : [6, "Email must be longer then 6 digits"],
    maxlenght : [30, 'Email must be shorter than 30 letters']
  }, 
  password : {
    type : String, 
    select : false
  }
}, {
  timestamps: true
})

// hashing password 
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10 ); 
}

// comparing password with old password
userSchema.methods.isValidPassword = async function (password){
  return await bcrypt.compare(password, this.password);
}

// creating a jwt token 
userSchema.methods.generateJWT =  function () {
  return  jwt.sign({ email : this.email , },process.env.JWT_TOKEN)
}

// exporting the modal 
 const User = mongoose.model('User', userSchema); 
 export default User;