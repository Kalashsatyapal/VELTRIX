import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;

const userProjection = {
    id: true,
    name: true,
    email: true,
    phone: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true
};

export async function registerUser(data) {
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        const error = new Error('Email is already registered');
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(
        data.password,
        SALT_ROUNDS
    );

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone: data.phone || null,
            role: 'CUSTOMER',
            status: 'ACTIVE'
        },
        select: userProjection
    });

    return user;
}

export async function authenticateUser(email, password) {
    const user = await prisma.user.findUnique({
        where: {
            email: email.trim().toLowerCase()
        }
    });

    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatches) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    if (user.status !== 'ACTIVE') {
        const error = new Error('Account is not active');
        error.statusCode = 403;
        throw error;
    }

    const { password: ignoredPassword, ...safeUser } = user;

    return safeUser;
}

export async function getUserProfile(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: userProjection
    });

    if (!user || user.status !== 'ACTIVE') {
        const error = new Error('User account not found or inactive');
        error.statusCode = 404;
        throw error;
    }

    return user;
}

export async function updateUserProfile(userId, data) {
    const updateData = {};

    if (data.name !== undefined) {
        updateData.name = data.name.trim();
    }

    if (data.phone !== undefined) {
        updateData.phone = data.phone || null;
    }

    return prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: userProjection
    });
}