import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Star } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        category: 'Electronics',
        price: 2499,
        rating: 4.8,
        description: 'Experience immersive audio with premium wireless headphones designed for everyday comfort.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000'
    },
    {
        id: 2,
        name: 'Classic Sports Sneakers',
        category: 'Fashion',
        price: 3299,
        rating: 4.6,
        description: 'Comfortable sports sneakers designed for everyday movement.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000'
    },
    {
        id: 3,
        name: 'Modern Smart Watch',
        category: 'Accessories',
        price: 4199,
        rating: 4.9,
        description: 'A modern smartwatch with an elegant everyday design.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000'
    }
];

export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find(item => item.id === Number(id));

    if (!product) {
        return (
            <div className="py-32 text-center">
                <h1 className="text-3xl font-black">Product not found</h1>
                <Link to="/products" className="mt-5 inline-block text-indigo-600">
                    Back to products
                </Link>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-5 py-16">

            <Link to="/products" className="mb-10 inline-flex items-center gap-2 font-semibold text-slate-500">
                <ArrowLeft size={18} />
                Back to collection
            </Link>

            <div className="grid items-center gap-12 md:grid-cols-2">

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-112.5 w-full rounded-3xl bg-slate-100 object-cover"
                />

                <div>
                    <p className="font-bold uppercase tracking-widest text-indigo-600">
                        {product.category}
                    </p>

                    <h1 className="mt-5 text-4xl font-black text-slate-950 md:text-5xl">
                        {product.name}
                    </h1>

                    <div className="mt-5 flex items-center gap-2 text-amber-500">
                        <Star size={18} fill="currentColor" />
                        <span className="font-bold">{product.rating}</span>
                    </div>

                    <p className="mt-8 text-3xl font-black text-slate-950">
                        ₹{product.price.toLocaleString('en-IN')}
                    </p>

                    <p className="mt-6 leading-8 text-slate-500">
                        {product.description}
                    </p>

                    <Link
                        to="/cart"
                        className="mt-9 inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white hover:bg-indigo-700"
                    >
                        <ShoppingBag size={20} />
                        Go to Shopping Cart
                    </Link>
                </div>

            </div>
        </section>
    );
}