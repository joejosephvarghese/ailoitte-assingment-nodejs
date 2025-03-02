const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../models/connection");
const paginate = require("../models/plugins/paginate.plugin");

// Define Order model
const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "canceled"),
      allowNull: false,
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.ENUM("cash_on_delivery", "credit_card", "paypal"),
      allowNull: false,
      defaultValue: "cash_on_delivery",
    },
  
  },
  {
    timestamps: true,
  }
);

// Apply pagination plugin
paginate(Order);

// Relationships
Order.belongsTo(sequelize.models.User, { foreignKey: "userId", as: "user" });
Order.belongsTo(sequelize.models.Product, { foreignKey: "productId", as: "product" });

(async () => {
  try {
    await sequelize.sync();
    console.log("✅ Order model synced with database");
  } catch (error) {
    console.error("❌ Error syncing Order model:", error);
  }
})();

module.exports = Order;
