const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.error(err); // Log the error to the console
      res
        .status(500)
        .json({ message: "Error retrieving categories", error: err.message });
    });
});

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, {
    include: [Product],
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
      res.json(category);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category[0]) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
      res.json(category);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "No category found with this id!" });
        return;
      }
      res.json({ message: "Category deleted!" });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
