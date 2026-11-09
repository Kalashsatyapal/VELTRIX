import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDirectory = path.resolve(__dirname, '../logs');

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message, ...metadata }) => {
        const details = Object.keys(metadata).length
            ? JSON.stringify(metadata)
            : '';

        return `${timestamp} [${level}]: ${message} ${details}`;
    })
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',

    format: logFormat,

    defaultMeta: {
        application: 'VELTRIX'
    },

    transports: [
        new winston.transports.File({
            filename: path.join(logDirectory, 'combined.log'),
            level: 'info',
            maxsize: 10485760,
            maxFiles: 5,
            tailable: true
        }),

        new winston.transports.File({
            filename: path.join(logDirectory, 'errors.log'),
            level: 'error',
            maxsize: 10485760,
            maxFiles: 5,
            tailable: true
        }),

        new winston.transports.Console({
            format: consoleFormat
        })
    ],

    exitOnError: false
});

export default logger;