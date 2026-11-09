import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../services/productService.js';

export async function listProducts(req, res) {
    const result = await getProducts({
        ...req.query,
        page: Number(req.query.page || 1),
        limit: Number(req.query.limit || 12),
        minPrice: req.query.minPrice === undefined
            ? undefined
            : Number(req.query.minPrice),
        maxPrice: req.query.maxPrice === undefined
            ? undefined
            : Number(req.query.maxPrice)
    });

    return res.status(200).json({
        success: true,
        data: result
    });
}

export async function productDetails(req, res) {
    const product = await getProductById(req.params.id);

    return res.status(200).json({
        success: true,
        data: { product }
    });
}

export async function addProduct(req, res) {
    const product = await createProduct(
        req.body,
        req.user.id
    );

    return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: { product }
    });
}

export async function editProduct(req, res) {
    const product = await updateProduct(
        req.params.id,
        req.body,
        req.user.id
    );

    return res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: { product }
    });
}

export async function archiveProduct(req, res) {
    const product = await deleteProduct(
        req.params.id,
        req.user.id
    );

    return res.status(200).json({
        success: true,
        message: 'Product archived successfully',
        data: { product }
    });
}