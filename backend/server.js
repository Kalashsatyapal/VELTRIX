import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import logger from './config/logger.js';

import {
    connectDatabase,
    disconnectDatabase
} from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

import {
    validateRequest,
    validateQuery,
    validateRouteParams
} from './middleware/requestValidator.js';

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim());

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet());

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({
    limit: '1mb',
    strict: true
}));

app.use(express.urlencoded({
    extended: false,
    limit: '1mb'
}));

app.use(cookieParser());

app.use('/api', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: 'draft-8',
    legacyHeaders: false
}));

app.use('/api', validateQuery);
app.use('/api', validateRouteParams);
app.use('/api', validateRequest);

const uploadDirectory = path.resolve(
    __dirname,
    process.env.UPLOAD_DIR || 'uploads/products'
);

app.use(
    '/uploads/products',
    express.static(uploadDirectory, {
        dotfiles: 'deny',
        index: false,
        maxAge: '7d'
    })
);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        application: 'VELTRIX',
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

let server;

async function startServer() {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL is not configured');
        }

        if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
            throw new Error('JWT_SECRET must contain at least 32 characters');
        }

        await connectDatabase();

        server = app.listen(PORT, () => {
            logger.info('VELTRIX server started', {
                port: PORT,
                environment: process.env.NODE_ENV
            });
        });
    } catch (error) {
        logger.error('VELTRIX startup failed', {
            message: error.message
        });

        process.exit(1);
    }
}

async function shutdown(signal) {
    logger.info('Shutdown signal received', { signal });

    if (!server) {
        await disconnectDatabase();
        process.exit(0);
    }

    server.close(async () => {
        try {
            await disconnectDatabase();
            process.exit(0);
        } catch (error) {
            logger.error('Shutdown failed', {
                message: error.message
            });

            process.exit(1);
        }
    });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', error => {
    logger.error('Uncaught exception', {
        message: error.message,
        stack: error.stack
    });

    process.exit(1);
});

process.on('unhandledRejection', reason => {
    logger.error('Unhandled promise rejection', {
        reason: String(reason)
    });

    process.exit(1);
});

startServer();

export default app;