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

        res.render('homepage', { recipes, loggedIn: req.session.loggedIn });
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

router.get('/recipe/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    },
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
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No recipe found with this id' });
        return;
      }

      // serialize the data
      const recipe = dbRecipeData.get({ plain: true });

      // pass data to template
      res.render('single-recipe', { recipe, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;