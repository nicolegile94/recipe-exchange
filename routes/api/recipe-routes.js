const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, User, MadeIt, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Recipe.findAll({
      order: [['created_at', 'DESC']],
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
      .then(dbRecipeData => res.json(dbRecipeData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/:id', (req, res) => {
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
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {
    Recipe.create({
      title: req.body.title,
      recipe_url: req.body.recipe_url,
      user_id: req.body.user_id
    })
      .then(dbRecipeData => res.json(dbRecipeData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });  

router.put('/madeit', (req, res) => {
    // custom static method created in models/Post.js
    Recipe.madeitvote(req.body, { MadeIt })
      .then(updatedRecipeData => res.json(updatedRecipeData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

router.put('/:id', (req, res) => {
    Recipe.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.delete('/:id', (req, res) => {
    Recipe.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
module.exports = router;