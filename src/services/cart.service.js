const { Sequelize, Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const { Cart } = require("../models");
const apiError = require("../utils/apiError");

const createCart = async (userId, productId, quantity ) => {
  const numQuantity = Number(quantity);
  const [cartItem, created] = await Cart.findOrCreate({
    where: { userId, productId },
    defaults: { quantity: numQuantity },
  });
  if (!created) {
    cartItem.quantity = numQuantity;
    await cartItem.save();
  }
  return cartItem;
};

const getUserCart = async (filter, option) => {
  const userCart = await Cart.paginate(filter, option);
  return userCart;
};

const removeItemFromCart = async (cartId) => {
  const cartItem = await Cart.findByPk(cartId);
  if (!cartItem) {
    throw new apiError(StatusCodes.NOT_FOUND, "CartItem not found");
  }

  await cartItem .destroy();
  return;
};

const clearCart = async (userId) => {
  const deletedCount = await Cart.destroy({
    where: { userId },
  });

  if (deletedCount === 0) {
    throw new apiError(StatusCodes.NOT_FOUND, "No items found in the cart");
  }

  return ;
};

module.exports = {
  createCart,
  getUserCart,
  removeItemFromCart,
  clearCart
};
