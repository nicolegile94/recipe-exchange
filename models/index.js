const User = require('./User');
const Recipe = require('./Recipe');
const MadeIt = require('./MadeIt');

User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Recipe, {
    through: MadeIt,
    as: 'made_recipe',
    foreignKey: 'user_id'
});
  
Recipe.belongsToMany(User, {
    through: MadeIt,
    as: 'made_recipe',
    foreignKey: 'recipe_id'
});

MadeIt.belongsTo(User, {
    foreignKey: 'user_id'
});
  
MadeIt.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});
  
User.hasMany(MadeIt, {
    foreignKey: 'user_id'
});
  
Recipe.hasMany(MadeIt, {
    foreignKey: 'recipe_id'
});

module.exports = { User, Recipe, MadeIt };