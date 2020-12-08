const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'user_id',
            'recipe_id',
            'comment_text'
          ]
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        recipe_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

router.delete('/:id', (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'No comment found with this id'})
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