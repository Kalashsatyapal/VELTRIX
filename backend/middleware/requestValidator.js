const MAX_BODY_DEPTH = 8;
const MAX_ARRAY_LENGTH = 100;
const MAX_STRING_LENGTH = 5000;
const MAX_NUMERIC_VALUE = Number.MAX_SAFE_INTEGER;

function validateValue(value, field, depth = 0) {
    if (depth > MAX_BODY_DEPTH) {
        throw new Error(`${field} exceeds maximum nesting depth`);
    }

    if (value === null || value === undefined) {
        throw new Error(`${field} cannot be null or undefined`);
    }

    if (typeof value === 'number') {
        if (!Number.isFinite(value)) {
            throw new Error(`${field} must be a finite number`);
        }

        if (value < 0) {
            throw new Error(`${field} cannot be negative`);
        }

        if (value > MAX_NUMERIC_VALUE) {
            throw new Error(`${field} exceeds the permitted numeric range`);
        }

        return;
    }

    if (typeof value === 'string') {
        if (value.length > MAX_STRING_LENGTH) {
            throw new Error(`${field} exceeds maximum string length`);
        }

        return;
    }

    if (typeof value === 'boolean') {
        return;
    }

    if (Array.isArray(value)) {
        if (value.length > MAX_ARRAY_LENGTH) {
            throw new Error(`${field} exceeds maximum array length`);
        }

        value.forEach((item, index) => {
            validateValue(item, `${field}[${index}]`, depth + 1);
        });

        return;
    }

    if (typeof value === 'object') {
        const entries = Object.entries(value);

        if (entries.length > 100) {
            throw new Error(`${field} contains too many properties`);
        }

        for (const [key, nestedValue] of entries) {
            validateValue(
                nestedValue,
                `${field}.${key}`,
                depth + 1
            );
        }

        return;
    }

    throw new Error(`${field} contains an unsupported value`);
}

export function validateRequest(req, res, next) {
    try {
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            return next();
        }

        if (
            !req.is('application/json') &&
            req.method !== 'DELETE'
        ) {
            if (req.body && Object.keys(req.body).length > 0) {
                return res.status(415).json({
                    success: false,
                    message: 'Content-Type must be application/json'
                });
            }

            return next();
        }

        if (
            req.body === null ||
            req.body === undefined ||
            typeof req.body !== 'object' ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Request body must be a valid JSON object'
            });
        }

        validateValue(req.body, 'body');

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export function validateQuery(req, res, next) {
    try {
        const allowedNumericParameters = [
            'page',
            'limit',
            'minPrice',
            'maxPrice',
            'stock',
            'rating'
        ];

        for (const parameter of allowedNumericParameters) {
            const value = req.query[parameter];

            if (value === undefined) continue;

            if (typeof value !== 'string' || value.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: `Invalid ${parameter} parameter`
                });
            }

            const numericValue = Number(value);

            if (
                !Number.isFinite(numericValue) ||
                numericValue < 0 ||
                numericValue > MAX_NUMERIC_VALUE
            ) {
                return res.status(400).json({
                    success: false,
                    message: `${parameter} must be a non-negative valid number`
                });
            }
        }

        if (req.query.page !== undefined && Number(req.query.page) < 1) {
            return res.status(400).json({
                success: false,
                message: 'Page must be at least 1'
            });
        }

        if (
            req.query.limit !== undefined &&
            (
                Number(req.query.limit) < 1 ||
                Number(req.query.limit) > 100
            )
        ) {
            return res.status(400).json({
                success: false,
                message: 'Limit must be between 1 and 100'
            });
        }

        if (
            req.query.minPrice !== undefined &&
            req.query.maxPrice !== undefined &&
            Number(req.query.minPrice) > Number(req.query.maxPrice)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Minimum price cannot exceed maximum price'
            });
        }

        for (const [key, value] of Object.entries(req.query)) {
            if (
                typeof value !== 'string' ||
                value.length > 200
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid query parameter: ${key}`
                });
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}

export function validateRouteParams(req, res, next) {
    for (const [key, value] of Object.entries(req.params)) {
        if (
            typeof value !== 'string' ||
            value.length === 0 ||
            value.length > 191
        ) {
            return res.status(400).json({
                success: false,
                message: `Invalid route parameter: ${key}`
            });
        }
    }

    next();
}