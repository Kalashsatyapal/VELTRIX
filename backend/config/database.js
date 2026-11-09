import { PrismaClient } from '@prisma/client';
import logger from './logger.js';

const databaseUrl = new URL(process.env.DATABASE_URL);

databaseUrl.searchParams.set(
    'connection_limit',
    process.env.DB_CONNECTION_LIMIT || '20'
);

databaseUrl.searchParams.set(
    'pool_timeout',
    process.env.DB_POOL_TIMEOUT || '10'
);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl.toString()
        }
    },
    log: process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error']
});

export async function connectDatabase() {
    try {
        await prisma.$connect();

        logger.info('MySQL database connected successfully');

        return true;
    } catch (error) {
        logger.error('Database connection failed', {
            message: error.message
        });

        throw error;
    }
}

export async function disconnectDatabase() {
    await prisma.$disconnect();

    logger.info('Database connection closed');
}

export default prisma;