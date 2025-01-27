import { v2 as cloudinary } from 'cloudinary';

const generatePresignedUrl = (imgType = "profile") => {
    const timestamp = Math.round((new Date).getTime() / 1000);
    const options = {
        folder: imgType == "profile" ? "ecommerce/profiles/" : "ecommerce/products",
        timestamp: timestamp,
        upload_preset: "ml_default",
    }

    const signature = cloudinary.utils.api_sign_request(options, process.env.CLOUDINARY_API_SECRET);

    return { ...options, signature }
}

export { generatePresignedUrl }