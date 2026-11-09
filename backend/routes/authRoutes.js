import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    checkSession
} from '../controllers/authController.js';

import { authenticate } from '../middleware/authMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many authentication attempts'
    }
});

function validateRegistration(req, res, next) {
    const { name, email, password, phone } = req.body;

    if (
        typeof name !== 'string' ||
        name.trim().length < 2 ||
        name.trim().length > 100
    ) {
        return res.status(400).json({
            success: false,
            message: 'Name must contain 2 to 100 characters'
        });
    }

    if (
        typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        email.length > 191
    ) {
        return res.status(400).json({
            success: false,
            message: 'Valid email address is required'
        });
    }

    if (
        typeof password !== 'string' ||
        password.length < 8 ||
        password.length > 72
    ) {
        return res.status(400).json({
            success: false,
            message: 'Password must contain 8 to 72 characters'
        });
    }

    if (
        phone !== undefined &&
        (
            typeof phone !== 'string' ||
            !/^[+0-9()\-\s]{7,20}$/.test(phone)
        )
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid phone number'
        });
    }

    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (
        typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        email.length > 191
    ) {
        return res.status(400).json({
            success: false,
            message: 'Valid email address is required'
        });
    }

    if (
        typeof password !== 'string' ||
        password.length === 0 ||
        password.length > 72
    ) {
        return res.status(400).json({
            success: false,
            message: 'Valid password is required'
        });
    }

    next();
}

function validateProfileUpdate(req, res, next) {
    const allowedFields = ['name', 'phone'];
    const fields = Object.keys(req.body);

    if (
        fields.length === 0 ||
        fields.some(field => !allowedFields.includes(field))
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid profile update fields'
        });
    }

    const { name, phone } = req.body;

    if (
        name !== undefined &&
        (
            typeof name !== 'string' ||
            name.trim().length < 2 ||
            name.trim().length > 100
        )
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid name'
        });
    }

    if (
        phone !== undefined &&
        (
            typeof phone !== 'string' ||
            !/^[+0-9()\-\s]{7,20}$/.test(phone)
        )
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid phone number'
        });
    }

    next();
}

router.post(
    '/register',
    authLimiter,
    validateRegistration,
    asyncHandler(register)
);

router.post(
    '/login',
    authLimiter,
    validateLogin,
    asyncHandler(login)
);

router.post('/logout', asyncHandler(logout));

router.get(
    '/me',
    authenticate,
    asyncHandler(getProfile)
);

router.get(
    '/session',
    authenticate,
    asyncHandler(checkSession)
);

router.patch(
    '/profile',
    authenticate,
    validateProfileUpdate,
    asyncHandler(updateProfile)
);

export default router;