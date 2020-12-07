const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, User, MadeIt } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Recipe.findAll({
      attributes: ['id', 'recipe_url', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
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
      attributes: ['id', 'recipe_url', 'title', 'created_at'],
      include: [
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
  MadeIt.create({
    user_id: req.body.user_id,
    recipe_id: req.body.recipe_id
  })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => res.json(err));
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