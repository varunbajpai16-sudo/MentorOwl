import { User } from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import AsyncHandler from '../utils/AsyncHandler.js'
import ApiError from '../utils/ApiError.utils.js'

export const VerifyJwt = AsyncHandler(async (req, __, next) => {
  const token =
    req.cookies?.accesstoken ||
    (req.header('Authorization')?.startsWith('Bearer ')
      ? req.header('Authorization').replace('Bearer ', '')
      : null)

  if (!token) {
    throw new ApiError(401, ' Unauthorized Token not Found')
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    throw new ApiError(401, 'Invalid Token or Expired Token')
  }

  const user = await User.findById(decodedToken._id)

  if (!user) {
    throw new ApiError(404, 'User not Found')
  }
  req.user = user
  next()
})
