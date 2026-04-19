const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate _id if not provided
  },
  name: {
    type: String,
    required: true,
    trim: true, // Remove extra whitespace
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      quantity: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  instructions: [{
    type: String,
    required: true,
    trim: true,
  }],
  prepTime: {
    type: Number,
    required: true,
    min: 0, // Ensure prepTime is non-negative
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'], // Restrict to valid values
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  imageUrl: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Add createdAt and updatedAt fields
});

// Add an index for better query performance (e.g., on name or tags)
recipeSchema.index({ name: 'text', tags: 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;