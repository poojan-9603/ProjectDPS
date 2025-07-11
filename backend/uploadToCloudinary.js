import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dtwvo72ln',
  api_key: '922686358631774',
  api_secret: 'VSuLB30-Nup8miuz8E-jRrOmlb0'
})

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        } )
        fs.unlinkSync(localFilePath);
        return responce;
    }
    
    catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
            return null;
    }
    console.error("❌ Cloudinary upload failed:", error.message);
    return null;
}
}

export default uploadToCloudinary;
