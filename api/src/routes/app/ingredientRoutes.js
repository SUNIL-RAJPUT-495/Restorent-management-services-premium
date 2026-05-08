import express from 'express';
import {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient
} from '../../controllers/app/ingredientController.js';
import { protectRestaurant, requireActivePlanAndPayment } from '../../middleware/restaurantAuthMiddleware.js';

const router = express.Router();

router.use(protectRestaurant, requireActivePlanAndPayment);

router.get('/', getIngredients);
router.post('/add', addIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export default router;
