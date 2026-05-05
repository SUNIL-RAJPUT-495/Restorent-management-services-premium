import express from 'express';
import { getTables, updateTableStatus, addTable, deleteTable } from '../../controllers/app/tableController.js';

const router = express.Router();

router.get('/', getTables);
router.post('/', addTable);
router.put('/:number', updateTableStatus);
router.delete('/:number', deleteTable);

export default router;
