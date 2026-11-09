import prisma from '../config/database.js';
import logger from '../config/logger.js';
import { generateSlug } from '../utils/slugUtils.js';

const productSelect = {
    id: true,
    name: true,
    slug: true,
    description: true,
    sku: true,
    category: true,
    brand: true,
    price: true,
    compareAtPrice: true,
    stock: true,
    lowStockLimit: true,
    image: true,
    status: true,
    createdAt: true,
    updatedAt: true
};

function buildProductFilters(filters) {
    const where = {
        status: 'ACTIVE'
    };

    if (filters.search) {
        where.OR = [
            {
                name: {
                    contains: filters.search
                }
            },
            {
                description: {
                    contains: filters.search
                }
            },
            {
                sku: {
                    contains: filters.search
                }
            }
        ];
    }

    if (filters.category) {
        where.category = filters.category;
    }

    if (filters.brand) {
        where.brand = filters.brand;
    }

    if (
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined
    ) {
        where.price = {};

        if (filters.minPrice !== undefined) {
            where.price.gte = filters.minPrice;
        }

        if (filters.maxPrice !== undefined) {
            where.price.lte = filters.maxPrice;
        }
    }

    if (filters.inStock === 'true') {
        where.stock = { gt: 0 };
    }

    return where;
}

export async function getProducts(filters) {
    const page = Number(filters.page || 1);
    const limit = Number(filters.limit || 12);

    const allowedSorts = {
        newest: { createdAt: 'desc' },
        oldest: { createdAt: 'asc' },
        price_low: { price: 'asc' },
        price_high: { price: 'desc' },
        name: { name: 'asc' }
    };

    const orderBy = allowedSorts[filters.sort] || allowedSorts.newest;

    const where = buildProductFilters(filters);

    const [products, total] = await prisma.$transaction([
        prisma.product.findMany({
            where,
            select: productSelect,
            orderBy: [
                orderBy,
                { id: 'asc' }
            ],
            skip: (page - 1) * limit,
            take: limit
        }),

        prisma.product.count({ where })
    ]);

    return {
        products,
        pagination: {
            currentPage: page,
            pageSize: limit,
            totalProducts: total,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPreviousPage: page > 1
        }
    };
}

export async function getProductById(id) {
    const product = await prisma.product.findUnique({
        where: { id },
        select: productSelect
    });

    if (!product || product.status !== 'ACTIVE') {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }

    return product;
}

export async function createProduct(data, adminId) {
    const slug = generateSlug(data.name);

    if (!slug) {
        const error = new Error('Product name cannot generate a valid slug');
        error.statusCode = 400;
        throw error;
    }

    const product = await prisma.product.create({
        data: {
            name: data.name.trim(),
            slug,
            description: data.description || null,
            sku: data.sku.trim().toUpperCase(),
            category: data.category.trim(),
            brand: data.brand?.trim() || null,
            price: data.price,
            compareAtPrice: data.compareAtPrice ?? null,
            stock: data.stock,
            lowStockLimit: data.lowStockLimit ?? 5,
            image: data.image || null,
            status: data.status || 'DRAFT'
        },
        select: productSelect
    });

    logger.info('Product created', {
        productId: product.id,
        sku: product.sku,
        adminId
    });

    if (product.stock <= product.lowStockLimit) {
        logger.warn('Low inventory detected after product creation', {
            productId: product.id,
            sku: product.sku,
            stock: product.stock
        });
    }

    return product;
}

export async function updateProduct(id, data, adminId) {
    const existing = await prisma.product.findUnique({
        where: { id }
    });

    if (!existing) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }

    const updateData = {};

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

    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            updateData[field] = data[field];
        }
    }

    if (updateData.name !== undefined) {
        updateData.name = updateData.name.trim();
        updateData.slug = generateSlug(updateData.name);
    }

    if (updateData.sku !== undefined) {
        updateData.sku = updateData.sku.trim().toUpperCase();
    }

    if (updateData.category !== undefined) {
        updateData.category = updateData.category.trim();
    }

    if (updateData.price !== undefined) {
        updateData.price = updateData.price;
    }

    if (updateData.stock !== undefined) {
        updateData.stock = updateData.stock;
    }

    if (updateData.brand !== undefined) {
        updateData.brand = updateData.brand.trim();
    }

    const product = await prisma.product.update({
        where: { id },
        data: updateData,
        select: productSelect
    });

    logger.info('Product updated', {
        productId: product.id,
        adminId,
        changedFields: Object.keys(updateData)
    });

    if (product.stock <= product.lowStockLimit) {
        logger.warn('Low inventory alert', {
            productId: product.id,
            sku: product.sku,
            stock: product.stock,
            threshold: product.lowStockLimit
        });
    }

    return product;
}

export async function deleteProduct(id, adminId) {
    const existing = await prisma.product.findUnique({
        where: { id }
    });

    if (!existing) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }

    const product = await prisma.product.update({
        where: { id },
        data: {
            status: 'ARCHIVED'
        },
        select: productSelect
    });

    logger.info('Product archived', {
        productId: id,
        sku: existing.sku,
        adminId
    });

    return product;
}