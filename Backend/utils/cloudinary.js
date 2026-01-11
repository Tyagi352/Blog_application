import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure only if credentials exist
if (process.env.CLOUDINARY_URL || process.env.CLOUDINARY_API_KEY) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Fallback uploader
const uploader = cloudinary.uploader?.upload
  ? cloudinary.uploader
  : {
      upload: async (image) => {
        return { secure_url: image };
      },
    };

export { uploader };
