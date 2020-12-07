const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Recipe extends Model {
  static madeitvote(body, models) {
    return models.MadeIt.create({
      user_id: body.user_id,
      recipe_id: body.recipe_id
    }).then(() => {
      return Recipe.findOne({
        where: {
          id: body.recipe_id
        },
        attributes: [
          'id',
          'recipe_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM madeit WHERE recipe.id = madeit.recipe_id)'),
            'madeit_count'
          ]
        ]
      });
    });
  }
}

Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recipe_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'recipe'
    }
  );

module.exports = Recipe;
  