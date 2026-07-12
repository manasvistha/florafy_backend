import { Router } from 'express';

import flowersRoute from '../modules/flowers/flowers.route.js';
import ordersRoute from '../modules/orders/orders.route.js';

const router = Router();

router.use('/flowers', flowersRoute);
router.use('/orders', ordersRoute);

export default router;