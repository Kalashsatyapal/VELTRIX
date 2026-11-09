const allowedStatuses = [
    'DRAFT',
    'ACTIVE',
    'OUT_OF_STOCK',
    'ARCHIVED'
];

const allowedFields = [
    'name',
    'description',
    'sku',
    'category',
    'brand',
    'price',
    'compareAtPrice',
    'stock',
    'lowStockLimit',
    'image',
    'status'
];

function validateProductFields(data, partial = false) {
    const errors = [];

    if (partial && Object.keys(data).length === 0) {
        errors.push('At least one field is required');
    }

    if (
        data.name !== undefined &&
        (
            typeof data.name !== 'string' ||
            data.name.trim().length < 2 ||
            data.name.trim().length > 191
        )
    ) {
        errors.push('Product name must contain 2 to 191 characters');
    }

    if (
        data.sku !== undefined &&
        (
            typeof data.sku !== 'string' ||
            !/^[a-zA-Z0-9_-]{2,100}$/.test(data.sku)
        )
    ) {
        errors.push('SKU must contain 2 to 100 valid characters');
    }

    if (
        data.category !== undefined &&
        (
            typeof data.category !== 'string' ||
            data.category.trim().length < 2 ||
            data.category.trim().length > 100
        )
    ) {
        errors.push('Invalid product category');
    }

    if (
        data.description !== undefined &&
        (
            typeof data.description !== 'string' ||
            data.description.length > 10000
        )
    ) {
        errors.push('Description cannot exceed 10000 characters');
    }

    if (
        data.brand !== undefined &&
        (
            typeof data.brand !== 'string' ||
            data.brand.length > 100
        )
    ) {
        errors.push('Invalid brand');
    }

    if (
        data.price !== undefined &&
        (
            typeof data.price !== 'number' ||
            !Number.isFinite(data.price) ||
            data.price <= 0 ||
            data.price > 9999999999
        )
    ) {
        errors.push('Price must be a positive valid amount');
    }

    if (
        data.compareAtPrice !== undefined &&
        (
            typeof data.compareAtPrice !== 'number' ||
            !Number.isFinite(data.compareAtPrice) ||
            data.compareAtPrice < 0 ||
            data.compareAtPrice > 9999999999
        )
    ) {
        errors.push('Invalid comparison price');
    }

    if (
        data.compareAtPrice !== undefined &&
        data.price !== undefined &&
        data.compareAtPrice < data.price
    ) {
        errors.push('Comparison price must not be lower than selling price');
    }

    if (
        data.stock !== undefined &&
        (
            !Number.isInteger(data.stock) ||
            data.stock < 0 ||
            data.stock > 100000000
        )
    ) {
        errors.push('Stock must be a valid non-negative integer');
    }

    if (
        data.lowStockLimit !== undefined &&
        (
            !Number.isInteger(data.lowStockLimit) ||
            data.lowStockLimit < 0 ||
            data.lowStockLimit > 100000000
        )
    ) {
        errors.push('Invalid low-stock threshold');
    }

    if (
        data.image !== undefined &&
        (
            typeof data.image !== 'string' ||
            data.image.length > 500 ||
            !data.image.startsWith('/uploads/products/')
        )
    ) {
        errors.push('Invalid product image path');
    }

    if (
        data.status !== undefined &&
        !allowedStatuses.includes(data.status)
    ) {
        errors.push('Invalid product status');
    }

    if (errors.length > 0) {
        const error = new Error(errors.join('; '));
        error.statusCode = 400;
        throw error;
    }
}

export function validateCreateProduct(req, res, next) {
    try {
        const requiredFields = [
            'name',
            'sku',
            'category',
            'price',
            'stock'
        ];

        for (const field of requiredFields) {
            if (req.body[field] === undefined) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`
                });
            }
        }

        const unknownFields = Object.keys(req.body).filter(
            field => !allowedFields.includes(field)
        );

        if (unknownFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Unknown product fields',
                fields: unknownFields
            });
        }

        validateProductFields(req.body);

        next();
    } catch (error) {
        next(error);
    }
}

export function validateUpdateProduct(req, res, next) {
    try {
        const unknownFields = Object.keys(req.body).filter(
            field => !allowedFields.includes(field)
        );

        if (unknownFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Unknown product fields',
                fields: unknownFields
            });
        }

        validateProductFields(req.body, true);

        next();
    } catch (error) {
        next(error);
    }
}

export function validateProductFilters(req, res, next) {
    const { search, category, brand, sort, inStock } = req.query;

    if (
        search !== undefined &&
        search.trim().length > 100
    ) {
        return res.status(400).json({
            success: false,
            message: 'Search cannot exceed 100 characters'
        });
    }

    if (
        category !== undefined &&
        category.trim().length > 100
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid category filter'
        });
    }

    if (
        brand !== undefined &&
        brand.trim().length > 100
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid brand filter'
        });
    }

    const allowedSorts = [
        'newest',
        'oldest',
        'price_low',
        'price_high',
        'name'
    ];

    if (sort !== undefined && !allowedSorts.includes(sort)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid sorting option'
        });
    }

    if (
        inStock !== undefined &&
        !['true', 'false'].includes(inStock)
    ) {
        return res.status(400).json({
            success: false,
            message: 'Invalid stock filter'
        });
    }

    next();
}