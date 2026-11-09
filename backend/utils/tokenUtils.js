import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export function generateToken(user) {
    if (!JWT_SECRET || JWT_SECRET.length < 32) {
        throw new Error('JWT_SECRET is not configured correctly');
    }

    return jwt.sign(
        {
            sub: user.id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN,
            issuer: 'veltrix-api',
            audience: 'veltrix-client'
        }
    );
}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET, {
        issuer: 'veltrix-api',
        audience: 'veltrix-client',
        algorithms: ['HS256']
    });
}

export function getCookieOptions() {
    const production = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,
        secure: production,
        sameSite: production ? 'none' : 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000
    };
}

export function getClearCookieOptions() {
    const production = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,
        secure: production,
        sameSite: production ? 'none' : 'lax',
        path: '/'
    };
}