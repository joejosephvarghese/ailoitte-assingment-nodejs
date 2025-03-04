const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/connection'); // Ensure correct Sequelize instance
const paginate = require('../models/plugins/paginate.plugin'); // Pagination plugin
const Category = require('../models/category.model'); // Import Category model

// Define Product model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
    },
    get() {
      const value = this.getDataValue('price');
      return value ? parseFloat(value) : null;
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  categoryId: { 
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id', 
    },
    onDelete: 'CASCADE',  
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Apply pagination plugin
paginate(Product);

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category', // This alias must match the one in your query includes
});

(async () => {
  try {
    await sequelize.sync();
    console.log("✅ Product model synced with database");
  } catch (error) {
    console.error("❌ Error syncing Product model:", error);
  }
})();

module.exports = Product;
