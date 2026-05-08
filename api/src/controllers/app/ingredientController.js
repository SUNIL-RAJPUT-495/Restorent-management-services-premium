import Ingredient from '../../models/App_Restaurant/Ingredient.js';

export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ restId: req.restaurant._id });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addIngredient = async (req, res) => {
  try {
    const ingredientData = { ...req.body, restId: req.restaurant._id };
    const ingredient = new Ingredient(ingredientData);
    const createdIngredient = await ingredient.save();
    res.status(201).json(createdIngredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findOneAndUpdate(
      { _id: req.params.id, restId: req.restaurant._id },
      req.body,
      { new: true }
    );
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findOneAndDelete({ _id: req.params.id, restId: req.restaurant._id });
    if (ingredient) {
      res.json({ message: 'Ingredient deleted' });
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
