import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../controllers/app/productController.js';
import { protectRestaurant, requireActivePlanAndPayment } from '../../middleware/restaurantAuthMiddleware.js';

const router = express.Router();

router.use(protectRestaurant, requireActivePlanAndPayment);

router.get('/', getProducts);
router.post('/add', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
