const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MadeIt extends Model {}

MadeIt.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id'
          }
        },
        recipe_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'recipe',
            key: 'id'
          }
        }
      },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'madeit'
  }
);

module.exports = MadeIt;