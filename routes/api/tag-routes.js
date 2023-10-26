const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  })
  .then(tags => res.json(tags))
  .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [Product]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(tag);
  })
  .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
