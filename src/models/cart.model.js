const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/connection'); 
const paginate = require('../models/plugins/paginate.plugin'); 
const Product = require('../models/products.model'); 
const User = require('../models/user.model'); 


const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
}, {
  timestamps: true,
});

// Apply pagination plugin to Cart
paginate(Cart);

// Set up associations
Cart.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product', // Use this alias to include product details in queries
});
Cart.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user', // Use this alias to include user details in queries
});

(async () => {
  try {
    await sequelize.sync();
    console.log("✅ Cart model synced with database");
  } catch (error) {
    console.error("❌ Error syncing Cart model:", error);
  }
})();

module.exports = Cart;
