const { StatusCodes } = require("http-status-codes");
const { Sequelize, Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const { productService, categoryService } = require("../services");
const ApiError = require("../utils/apiError");
const { uploadImage, deleteImage } = require("../services/cloudinary.service");

const { Category } = require("../models");

const createProduct = catchAsync(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, "Missing request body");
  }

  let { name, price, description, categoryId } = req.body;
  price = parseFloat(price);

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
  let { page, limit, search, catagory, minPrice, maxPrice,price } = req.query;

  let filter = {};

  if (search) {
    filter = {
      name: { [Op.iLike]: `%${search}%` },
    };
  }

  if (catagory) {
    filter.categoryId = catagory;
  }
  minPrice = parseFloat(minPrice);
  maxPrice = parseFloat(maxPrice);

  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filter.price = {};
    if (!isNaN(minPrice)) filter.price[Op.gte] = minPrice;
    if (!isNaN(maxPrice)) filter.price[Op.lte] = maxPrice;
  }

  let options = {
    page,
    limit,
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
    order: [],
  };

  if (price) {
    if (price.toLowerCase() === "asc") {
      options.order.push(["price", "ASC"]);
    } else if (price.toLowerCase() === "desc") {
      options.order.push(["price", "DESC"]);
    }
  }
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

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.findProductById(req.params.productId);
  res.status(StatusCodes.OK).json({ result: product });
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProduct(req.params.productId);
  res.status(StatusCodes.OK).json({ message: "OK" });
});
module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductById,
  deleteProduct,
};
