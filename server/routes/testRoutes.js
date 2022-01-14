import express from 'express';
import { testParams } from '../controllers/testController.js';

const router = express.Router();

router.route('/params/:l/:param').get(testParams);

export default router;
