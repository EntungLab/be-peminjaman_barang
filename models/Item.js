const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  condition_status: {
    type: DataTypes.STRING,
  },
  availability_status: {
    type: DataTypes.STRING,
  },
  image_url: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Item; 