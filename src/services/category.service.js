const { Sequelize, Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const { Category } = require("../models");
const apiError = require("../utils/apiError");

const createCategory = async (cataBody) => {
  const { name, description } = cataBody;

  if (!name) {
    throw new apiError(StatusCodes.BAD_REQUEST, "Category name is required");
  }

  const existingCategory = await Category.findOne({
    where: {
      name: {
        [Op.iLike]: name,
      },
    },
  });

  if (existingCategory) {
    throw new apiError(
      StatusCodes.CONFLICT,
      "Category with this name already exists"
    );
  }

  const newCategory = await Category.create({
    name,
    description,
  });

  return newCategory;
};

const findCategoryById = async (categoryId) => {
  const category = await Category.findByPk(categoryId);

  if (!category) {
    throw new apiError(StatusCodes.NOT_FOUND, "Category not found");
  }
  return category;
};

const getAllCategory = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

const updateCategory = async (data, categoryId) => {
  const [updated] = await Category.update(data, {
    where: { id: categoryId },
    returning: true,
  });

  if (updated === 0) {
    throw new apiError(StatusCodes.NOT_FOUND, "Category not found");
  }

  const updatedCategory = await Category.findOne({
    where: { id: categoryId },
  });

  return updatedCategory;
};

module.exports = {
  createCategory,
  findCategoryById,
  getAllCategory,
  updateCategory,
};
