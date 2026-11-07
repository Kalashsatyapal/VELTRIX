import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';

const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        category: 'Electronics',
        price: 2499,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
    },
    {
        id: 2,
        name: 'Classic Sports Sneakers',
        category: 'Fashion',
        price: 3299,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    },
    {
        id: 3,
        name: 'Modern Smart Watch',
        category: 'Accessories',
        price: 4199,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
    },
    {
        id: 4,
        name: 'Minimalist Backpack',
        category: 'Fashion',
        price: 1899,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
    },
    {
        id: 5,
        name: 'Professional Camera',
        category: 'Electronics',
        price: 25999,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'
    },
    {
        id: 6,
        name: 'Modern Sunglasses',
        category: 'Accessories',
        price: 1499,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'
    }
];

export default function Products() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('default');

    const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter(product =>
            category === 'All' || product.category === category
        )
        .sort((a, b) => {
            if (sort === 'low') return a.price - b.price;
            if (sort === 'high') return b.price - a.price;
            return 0;
        });

    return (
        <section className="mx-auto min-h-screen max-w-7xl px-5 py-16">

            <div className="mb-12">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
                    VELTRIX COLLECTION
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                    Discover Products
                </h1>

                <p className="mt-4 text-slate-500">
                    Explore our curated shopping collection.
                </p>
            </div>

            <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="relative w-full lg:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                    <input
                        type="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    {categories.map(item => (
                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                                category === item
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} />

                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none"
                    >
                        <option value="default">Featured</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <p className="mb-6 text-sm text-slate-500">
                {filteredProducts.length} products found
            </p>

            {filteredProducts.length > 0 ? (
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
                    <h2 className="text-xl font-bold text-slate-900">
                        No products found
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Try another search or category.
                    </p>
                </div>
            )}
        </section>
    );
}