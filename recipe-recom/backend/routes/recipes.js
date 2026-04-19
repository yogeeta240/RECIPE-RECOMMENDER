const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const difficulty = req.query.difficulty; // Get difficulty from query

  try {
    let query = Recipe.find();
    if (difficulty) {
      query = query.where('difficulty').equals(difficulty.toLowerCase()); // Case-insensitive match
    }
    const recipes = await query.skip(skip).limit(limit);
    const total = await (difficulty ? query.model.countDocuments().where('difficulty').equals(difficulty.toLowerCase()) : Recipe.countDocuments());
    const totalPages = Math.ceil(total / limit);

    res.json({
      recipes,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;