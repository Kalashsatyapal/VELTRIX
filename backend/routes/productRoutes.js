import { Router } from 'express';

import {
    listProducts,
    productDetails,
    addProduct,
    editProduct,
    archiveProduct
} from '../controllers/productController.js';

import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

import {
    validateCreateProduct,
    validateUpdateProduct,
    validateProductFilters
} from '../middleware/productValidation.js';

import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

router.get(
    '/',
    validateProductFilters,
    asyncHandler(listProducts)
);

router.get(
    '/:id',
    asyncHandler(productDetails)
);

router.post(
    '/',
    authenticate,
    authorize('ADMIN'),
    validateCreateProduct,
    asyncHandler(addProduct)
);

router.patch(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    validateUpdateProduct,
    asyncHandler(editProduct)
);

router.delete(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    asyncHandler(archiveProduct)
);

export default router;