const cloudinary = require("cloudinary").v2;
const streamifier = require('streamifier');


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary configured successfully!");

// Cloudinary Upload Function
const uploadImage = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'products', public_id: filename, resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

// Get Optimized Image URL
const getOptimizedUrl = (publicId) => {
    return cloudinary.url(publicId, { fetch_format: "auto", quality: "auto" });
};

// Get Auto-Cropped Image URL
const getAutoCropUrl = (publicId, width = 500, height = 500) => {
    return cloudinary.url(publicId, { crop: "auto", gravity: "auto", width, height });
};

// Export functions
module.exports = { uploadImage, getOptimizedUrl, getAutoCropUrl, cloudinary };
