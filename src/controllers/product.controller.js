const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const { productService, catagoryService } = require("../services");
const ApiError = require("../utils/apiError");
const { uploadImage } = require("../services/cloudinary.service");

const createProduct = catchAsync(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, "Missing request body");
  }

  const { name, price, description, categoryId } = req.body;

  await catagoryService.findCategoryById(categoryId);

  let images = [];

  if (!req.files || !req.files["file"] || req.files["file"].length === 0) {
    throw new ApiError(400, "Missing required parameter - files");
  }

  const fileArray = Array.isArray(req.files["file"])
    ? req.files["file"]
    : [req.files["file"]];

  images = await Promise.all(
    fileArray.map(async (file) => {
      return await uploadImage(
        file.buffer,
        `product_${Date.now()}_${file.originalname}`
      );
    })
  );

  const newProduct = await productService.createProduct({
    name,
    price,
    description,
    categoryId,
    images,
  });

  res.status(201).json({ result: newProduct });
});

const getAllProducts = catchAsync(async (req, res) => {
  let { page, limit,search ,catagory} = req.query;


  let filter = {};

  if (search) {
    filter = {
      name: { [Op.iLike]: `%${search}%` }, 
    };
  }

  let options = {
    page,
    limit,
  };
  const products = await productService.getAllProducts(filter, options);
  res.status(200).json(products);
});

module.exports = {
  createProduct,
  getAllProducts,
};
