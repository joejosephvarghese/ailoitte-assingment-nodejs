const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');  // Import UUID generator
const sequelize = require('../models/connection');  // Adjust to your Sequelize instance
const bcrypt = require('bcryptjs');
const paginate = require('../models/plugins/paginate.plugin');  // Import the paginate plugin

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,  // Use UUID type for PostgreSQL
    defaultValue: Sequelize.UUIDV4,  // Automatically generate UUID
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,  // Ensures name is not empty
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,  // Ensures it's a valid email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],  // Ensure password is at least 8 characters long
    },
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,  // Profile pic is optional
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']],  // Only 'user' or 'admin' are valid roles
    },
  },
}, {
  timestamps: true,
  // hooks: {
  //   // Hook to hash the password before saving
  //   beforeSave: async (user, options) => {
  //     if (user.changed('password')) {
  //       user.password = await bcrypt.hash(user.password, 8);
  //     }
  //   },
  // },
});

// Apply paginate plugin to the User model
paginate(User);

// Sync the model (if not already done)
sequelize.sync({ force: false })
  .then(() => {
    console.log("User model synced with database");
  })
  .catch((error) => {
    console.error("Error syncing User model: ", error);
  });

module.exports = User;
