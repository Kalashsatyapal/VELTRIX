import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">

            <Link to={`/products/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {product.badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                            {product.badge}
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {product.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star size={13} fill="currentColor" />
                        {product.rating || 'New'}
                    </span>
                </div>

                <Link to={`/products/${product.id}`}>
                    <h3 className="truncate text-lg font-bold text-slate-950 hover:text-indigo-600">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-black text-slate-950">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>

                    <Link
                        to={`/products/${product.id}`}
                        aria-label={`View ${product.name}`}
                        className="rounded-xl bg-slate-950 p-3 text-white transition hover:bg-indigo-600"
                    >
                        <ShoppingBag size={18} />
                    </Link>
                </div>
            </div>
        </article>
    );
}