const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const { cartService } = require("../services");
const ApiError = require("../utils/apiError");
const { Product, User, Category } = require("../models");

const addToCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.query;

  const cartItem = await cartService.createCart(userId, productId, quantity);
  res.status(StatusCodes.OK).json(cartItem);
});

const getUserCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;
  const filter = {
    userId,
  };
  const option = {
    page,
    limit,
    include: [
      {
        model: Product,
        as: "product",
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      },
      {
        model: User,
        as: "user",
      },
    ],
  };
  const cartItems = await cartService.getUserCart(filter, option);
  res.status(StatusCodes.OK).json(cartItems);
});

const removeFromCart=catchAsync(async(req,res)=>{
    const {cartId}= req.query
    await cartService.removeItemFromCart(cartId);
    res.status(StatusCodes.OK).json({message:"OK"})
})

const clearUserCart=catchAsync(async(req,res)=>{
  const userId = req.user.id;
  await cartService.clearCart(userId);
  res.status(StatusCodes.OK).json({message:"OK"})
})

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
  clearUserCart
};
