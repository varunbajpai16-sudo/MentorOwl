import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: String,

    role: {
      type: String,
      enum: ['teacher', 'student', 'parent'],
      required: true,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

 

    isVerified: {
      type: Boolean,
      default: false,
    },

    accessToken: String,

    refreshToken: String,
  },
  { timestamps: true },
)

userSchema.methods.generateaccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_DURATION,
    },
  )
}




userSchema.methods.generaterefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_DURATION,
    },
  )
}


export const User = mongoose.model('User', userSchema)
