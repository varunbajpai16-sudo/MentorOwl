import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
export const uploadToCloudinary = async (localfilepath) => {
  console.log(cloudinary.config());
  try {
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: 'auto',
    })
    console.log(response);
    const absolutePath = path.resolve(localfilepath)
    fs.unlinkSync(absolutePath)
    console.log('File deleted successfully')
    return response
  } catch (error) {
    fs.unlinkSync(localfilepath)
    throw error
  }
}
export default uploadToCloudinary
