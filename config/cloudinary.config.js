const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

// Cloudinary and multer upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    resource_type: 'auto',
    folder: 'note-api',
    allowed_format: ['jpg', 'jpeg', 'png', 'gif', 'mp3', 'wav', 'ogg']
  }
})

module.exports = { storage }
