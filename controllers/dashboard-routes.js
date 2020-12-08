const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Recipe.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'recipe_url',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'recipe_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => {
        // serialize data before passing to template
        const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
        res.render('dashboard', { recipes, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});



module.exports = router;