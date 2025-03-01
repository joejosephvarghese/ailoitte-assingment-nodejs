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

module.exports = {
    createProduct,
    getAllProducts
};
