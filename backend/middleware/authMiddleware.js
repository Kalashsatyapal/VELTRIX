import prisma from '../config/database.js';
import { verifyToken } from '../utils/tokenUtils.js';
import logger from '../config/logger.js';

export async function authenticate(req, res, next) {
    try {
        const token = req.cookies?.veltrix_session;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const decoded = verifyToken(token);

        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true
            }
        });

        if (!user || user.status !== 'ACTIVE') {
            return res.status(401).json({
                success: false,
                message: 'Invalid or inactive session'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        logger.warn('Authentication failed', {
            message: error.message,
            path: req.originalUrl
        });

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired session'
        });
    }
}