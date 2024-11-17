const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Loan = sequelize.define('Loan', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity_borrowed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loan_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
  admin_id: {
    type: DataTypes.INTEGER,
  },
  approval_date: {
    type: DataTypes.DATE,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Loan; 