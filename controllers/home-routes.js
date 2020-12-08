const { constant } = require("lodash");
const { route } = require("./api");

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment } = require('../models');


router.get('/', (req, res) => {
    Recipe.findAll({
      attributes: [
        'id',
        'recipe_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM madeit WHERE recipe.id = madeit.recipe_id)'), 'madeit_count']
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
        // pass a single post object into the homepage template
        const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));

        res.render('homepage', { recipes });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  }
    res.render('login');
});


module.exports = router;