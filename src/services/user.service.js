const {User} = require('../models');

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};


const findById = async (userId) => {
  return await User.findByPk(userId);
};
module.exports = { 
  findByEmail,
  findById };
