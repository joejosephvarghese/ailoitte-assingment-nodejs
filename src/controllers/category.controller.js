const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const { categoryService } = require("../services");
const ApiError = require("../utils/apiError");

const createCategory = catchAsync(async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);
  res.status(StatusCodes.OK).json({ result: newCategory });
});

const getAllCategory = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  let filter = {};
  let options = {
    page,
    limit,
  };
  const categories = await categoryService.getAllCategory(filter, options);
  res.status(StatusCodes.OK).json(categories);
});

const getByCategoryId = catchAsync(async (req, res) => {
  const category = await categoryService.findCategoryById(
    req.params.categoryId
  );
  res.status(StatusCodes.OK).json({ result: category });
});
const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const data = req.body;
  const category = await categoryService.updateCategory(data, categoryId);
  res.status(StatusCodes.OK).json({ result: category });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  await categoryService.deleteCategory(categoryId);
  res.status(StatusCodes.OK).json({ message: "Category deleted successfully" });
});

module.exports = {
  createCategory,
  getAllCategory,
  getByCategoryId,
  updateCategory,
  deleteCategory,
};
