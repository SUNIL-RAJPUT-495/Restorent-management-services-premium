import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({

  restId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restorent' },
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    default: 'kg',
  },
  stock: {
    type: Number,
    default: 0,
  },
  threshold: {
    type: Number,
    default: 10,
  },
  costPerUnit: {
    type: Number,
    default: 0,
  },
  supplier: {
    type: String,
  },
}, {
  timestamps: true,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
