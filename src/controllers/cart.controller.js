const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const { cartService } = require("../services");
const ApiError = require("../utils/apiError");

const addToCart = catchAsync(async (req, res) => {
 const userId=req.user.id
 const {productId,quantity}= req.query
 console.log(req.query,"req.query")

 const cartItem = await cartService.createCart(userId, productId, quantity);
 res.status(StatusCodes.OK).json(cartItem);
});

module.exports={
    addToCart
}
