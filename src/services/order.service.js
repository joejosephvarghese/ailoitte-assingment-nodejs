const { Product, Order, Cart } = require("../models");
const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const createOrder = async (cartIds, user, gateway) => {
  const cartItems = await Cart.findAll({
    where: { id: { [Op.in]: cartIds }, userId: user },
    include: [{ model: Product, as: "product" }],
  });

  if (!cartItems.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Cart items not found");
  }

  const orders = await Promise.all(
    cartItems.map(async (cart) => {
      return Order.create({
        userId: user,
        productId: cart.productId,
        quantity: cart.quantity,
        price: cart.product.price,
        total: cart.quantity * cart.product.price,
        status: "pending",
        paymentMethod: gateway,
      });
    })
  );

  await Cart.destroy({ where: { id: cartIds } });

  return orders;
};

const getAllOrders = async (filter, options) => {

  const orders = await Order.paginate(filter, options);
  if (!orders) {
    throw new ApiError(StatusCodes.NOT_FOUND, "orders not found");
  }

  return orders;
};

module.exports = {
  createOrder,
  getAllOrders,
};
