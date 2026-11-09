import logger from '../config/logger.js';

export default function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || err.status || 500;

    logger.error('Request processing failed', {
        method: req.method,
        url: req.originalUrl,
        statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'development'
            ? err.stack
            : undefined
    });

    res.status(statusCode).json({
        success: false,
        message: statusCode >= 500
            ? 'Internal server error'
            : err.message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack
        })
    });
}