const { Sequelize, Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const { Cart } = require("../models");
const apiError = require("../utils/apiError");

const createCart = async (userId, productId, quantity = 1) => {

    const numQuantity = Number(quantity);
    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, productId },
      defaults: { numQuantity },
    });
    if (!created) {
      cartItem.quantity += numQuantity;
      await cartItem.save();
    }
    return cartItem;
  };
  
  module.exports={
    createCart
  }