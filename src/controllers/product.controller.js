const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const { productService, categoryService } = require("../services");
const ApiError = require("../utils/apiError");
const { uploadImage, deleteImage } = require("../services/cloudinary.service");

const {Category}=require('../models')

const createProduct = catchAsync(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, "Missing request body");
  }

  const { name, price, description, categoryId } = req.body;

  await categoryService.findCategoryById(categoryId);

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
  let { page, limit, search, catagory } = req.query;

  let filter = {};

  if (search) {
    filter = {
      name: { [Op.iLike]: `%${search}%` },
    };
  }

  let options = {
    page,
    limit,
    include: [
      {
        model: Category, // Populates the category details based on the association
        as: 'category',  // Make sure this alias matches your association in the Product model
      },
    ],
    
  };
  const products = await productService.getAllProducts(filter, options);
  res.status(200).json(products);
});

const updateProduct = catchAsync(async (req, res) => {
  const { name, price, description, categoryId, imagesToDelete, stock } =
    req.body;
  if (categoryId) {
    await categoryService.findCategoryById(categoryId);
  }

  const product = await productService.findProductById(req.params.productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let imagesToDeleteArray = [];
  if (imagesToDelete) {
    imagesToDeleteArray = Array.isArray(imagesToDelete)
      ? imagesToDelete
      : [imagesToDelete];
  }

  if (imagesToDeleteArray.length > 0) {
    // Properly await extraction of public IDs for deletion
    const publicIdsToDelete = await Promise.all(
      imagesToDeleteArray.map(async (url) => {
        return await productService.extractPublicId(url);
      })
    );
    console.log(publicIdsToDelete, "publicIdsToDelete");

    await Promise.all(
      publicIdsToDelete.map((publicId) => deleteImage(publicId))
    );

    const currentImages = product.images || [];

    product.images = currentImages.filter((img) =>
      imagesToDeleteArray.includes(img)
    );
  }
  if (req.files && req.files["file"]) {
    const fileArray = Array.isArray(req.files["file"])
      ? req.files["file"]
      : [req.files["file"]];

    if (fileArray.length > 0) {
      const newImages = await Promise.all(
        fileArray.map(async (file) => {
          return await uploadImage(
            file.buffer,
            `product_${Date.now()}_${file.originalname}`
          );
        })
      );

      product.images = (product.images || []).concat(newImages);
    }
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (description !== undefined) product.description = description;
  if (categoryId !== undefined) product.categoryId = categoryId;
  if (stock !== undefined) product.stock = stock;

  const updatedProduct = await product.save();

  res.status(200).json(updatedProduct);
});

const getProductById= catchAsync(async(req,res)=>{

  const product =await productService.findProductById(req.params.productId)
  res.status(StatusCodes.OK).json({result:product})
})

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductById
};
