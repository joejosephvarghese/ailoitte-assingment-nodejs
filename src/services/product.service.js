const {Product} = require('../models');
const ApiError = require('../utils/apiError');

const createProduct = async (productData) => {
    const { name, price, description, categoryId, images } = productData;

    // Ensure price is a valid number
    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) throw new ApiError(400, "Invalid price value");

    // Create the product in the database
    return await Product.create({ 
        name, 
        price: priceValue, 
        description, 
        categoryId, 
        images 
    });
};


const getAllProducts=async(filter,options)=>{
    return await Product.paginate(filter, options);
}



const findProductById = async (productId) => {
    const product = await Product.findByPk(productId);
  
    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, "product not found");
    }
    return product;
  };

const extractPublicId = async (url) => {
    return new Promise((resolve, reject) => {
      try {
        // Split the URL at the "/upload/" segment.
        const parts = url.split('/upload/');
        if (parts.length < 2) return reject(new Error("Invalid URL format"));
  
        // parts[1] is something like "v1740858397/products/product_1740858394739_a01aa9dd51674bbbafa9ad2400c38dbd_9366.webp.webp"
        const subParts = parts[1].split('/');
  
        // Remove the version segment if present.
        if (subParts[0].startsWith("v")) {
          subParts.shift();
        }
  
        // Join the remaining segments to form the public_id with extension.
        const publicIdWithExt = subParts.join('/');
  
        // Remove the last file extension from the public_id.
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
        
        resolve(publicId);
      } catch (error) {
        console.error("Error extracting public_id from URL:", error);
        reject(error);
      }
    });
  };
  
 
  

module.exports = {
    createProduct,
    getAllProducts,
    extractPublicId,
    findProductById

};
