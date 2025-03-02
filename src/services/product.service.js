const { Product ,Category} = require("../models");
const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (productData) => {
  const { name, price, description, categoryId, images } = productData;

  const priceValue = parseFloat(price);
  if (isNaN(priceValue)) throw new ApiError(400, "Invalid price value");

  return await Product.create({
    name,
    price: priceValue,
    description,
    categoryId,
    images,
  });
};

const getAllProducts = async (filter, options) => {
  return await Product.paginate(filter, options);
};

const findProductById = async (productId) => {
  const product = await Product.findByPk(productId, {
    include: {
      model: Category,
      as: 'category',// This alias must match the one defined in Product.associate
    }
  });


  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, "product not found");
  }
  return product;
};

const extractPublicId = async (url) => {
  return new Promise((resolve, reject) => {
    try {
      const parts = url.split("/upload/");
      if (parts.length < 2) return reject(new Error("Invalid URL format"));

      const subParts = parts[1].split("/");

      if (subParts[0].startsWith("v")) {
        subParts.shift();
      }

      const publicIdWithExt = subParts.join("/");

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
  findProductById,
};
