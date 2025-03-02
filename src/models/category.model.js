const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/connection'); // Ensure correct Sequelize instance
const paginate = require('../models/plugins/paginate.plugin'); // Pagination plugin

// Define Category model
const Category = sequelize.define('Category', {
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
}, {
  timestamps: true, // Enables createdAt & updatedAt fields
});

// Apply pagination plugin
paginate(Category);


// Category.associate = (models) => {
//   Category.hasMany(models.Product, {
//     foreignKey: 'categoryId',
//     as: 'products',
//   });
// };

// Sync the model only if it hasn't been synced before
(async () => {
  try {
    await sequelize.sync();
    console.log("✅ Category model synced with database");
  } catch (error) {
    console.error("❌ Error syncing Category model:", error);
  }
})();

module.exports = Category;
