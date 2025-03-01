const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const { categoryService } = require("../services");
const ApiError = require("../utils/apiError");

const createCategory = catchAsync(async (req, res) => {
const newCategory=  await categoryService.createCategory(req.body);
  res.status(StatusCodes.OK).json({ result: newCategory });
});

const getAllCategory = catchAsync(async(req,res)=>{
  
  const{ page,limit}= req.query;
  let filter={}
  let options={
    page,
    limit
  }
  const categories= await categoryService.getAllCategory(filter,options)
  res.status(StatusCodes.OK).json(categories)
})

const getByCategoryId= catchAsync(async(req,res)=>{
  const category= await categoryService.findCategoryById(req.params.categoryId)
  res.status(StatusCodes.OK).json({result:category})
})

module.exports = {
  createCategory,
  getAllCategory,
  getByCategoryId
};
