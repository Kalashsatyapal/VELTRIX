import {
    registerUser,
    authenticateUser,
    getUserProfile,
    updateUserProfile
} from '../services/authService.js';

import {
    generateToken,
    getCookieOptions,
    getClearCookieOptions
} from '../utils/tokenUtils.js';

export async function register(req, res) {
    const { name, email, password, phone } = req.body;

    const user = await registerUser({
        name,
        email,
        password,
        phone
    });

    const token = generateToken(user);

    res.cookie(
        'veltrix_session',
        token,
        getCookieOptions()
    );

    return res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: { user }
    });
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);

    const token = generateToken(user);

    res.cookie(
        'veltrix_session',
        token,
        getCookieOptions()
    );

    return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { user }
    });
}

export async function logout(req, res) {
    res.clearCookie(
        'veltrix_session',
        getClearCookieOptions()
    );

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}

export async function getProfile(req, res) {
    const user = await getUserProfile(req.user.id);

    return res.status(200).json({
        success: true,
        data: { user }
    });
}

export async function updateProfile(req, res) {
    const user = await updateUserProfile(
        req.user.id,
        req.body
    );

    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: { user }
    });
}

export async function checkSession(req, res) {
    const user = await getUserProfile(req.user.id);

    return res.status(200).json({
        success: true,
        authenticated: true,
        data: { user }
    });
}