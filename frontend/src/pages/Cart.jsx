import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
    return (
        <section className="mx-auto min-h-[65vh] max-w-7xl px-5 py-20">

            <h1 className="text-4xl font-black text-slate-950">
                Shopping Cart
            </h1>

            <div className="mt-14 flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-20 text-center">

                <div className="rounded-full bg-indigo-50 p-6 text-indigo-600">
                    <ShoppingBag size={40} />
                </div>

                <h2 className="mt-7 text-2xl font-bold text-slate-950">
                    Your cart is waiting
                </h2>

                <p className="mt-3 text-slate-500">
                    Discover products and add your favorites.
                </p>

                <Link
                    to="/products"
                    className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white hover:bg-indigo-700"
                >
                    Explore Products
                </Link>
            </div>
        </section>
    );
}