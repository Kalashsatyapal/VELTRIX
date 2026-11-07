import { Link } from 'react-router-dom';

export default function Checkout() {
    return (
        <section className="mx-auto min-h-[65vh] max-w-5xl px-5 py-20">

            <h1 className="text-4xl font-black text-slate-950">
                Secure Checkout
            </h1>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <p className="mt-4 text-slate-500">
                    Your checkout summary will appear here once products are added to your cart.
                </p>

                <Link
                    to="/products"
                    className="mt-7 inline-block rounded-xl bg-indigo-600 px-7 py-3 font-bold text-white"
                >
                    Browse Products
                </Link>
            </div>
        </section>
    );
}