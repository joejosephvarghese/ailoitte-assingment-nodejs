const { StatusCodes } = require("http-status-codes");
const { Sequelize, Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const { orderService } = require("../services");
const ApiError = require("../utils/apiError");
const { Product, User } = require("../models");

const placeOrder = catchAsync(async (req, res) => {
  console.log(req.user.id);
  const { cartIds, gateway } = req.body;

  const userId = req.user.id;

  const orders = await orderService.createOrder(cartIds, userId, gateway);

  res.status(StatusCodes.OK).json(orders);
});

const getAllUserOrders = catchAsync(async (req, res) => {
  let { page, limit } = req.query;
  const userId = req.user.id;

  let filter = { userId };
  let options = {
    page,
    limit,
    include: [
      {
        model: Product,
        as: "product",
      },
      {
        model: User,
        as: "user",
      },
    ],
  };
  const orders = await orderService.getAllOrders(filter, options);
  res.status(StatusCodes.OK).json(orders);
});

module.exports = {
  placeOrder,
  getAllUserOrders,
};
