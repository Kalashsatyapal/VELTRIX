import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import SectionHeading from '../components/common/SectionHeading';

const featuredProducts = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        category: 'Electronics',
        price: 2499,
        rating: 4.8,
        badge: 'BESTSELLER',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
    },
    {
        id: 2,
        name: 'Classic Sports Sneakers',
        category: 'Fashion',
        price: 3299,
        rating: 4.6,
        badge: 'POPULAR',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    },
    {
        id: 3,
        name: 'Modern Smart Watch',
        category: 'Accessories',
        price: 4199,
        rating: 4.9,
        badge: 'NEW',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
    }
];

const benefits = [
    {
        icon: Truck,
        title: 'Fast Delivery',
        description: 'Reliable delivery to your doorstep.'
    },
    {
        icon: ShieldCheck,
        title: 'Secure Payments',
        description: 'Protected and secure checkout.'
    },
    {
        icon: RefreshCcw,
        title: 'Easy Returns',
        description: 'Simple and transparent return process.'
    }
];

export default function Home() {
    return (
        <div>
            <section className="relative overflow-hidden bg-slate-950">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">

                    <div className="relative z-10">
                        <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-xs font-bold tracking-widest text-indigo-300">
                            THE NEW WAY TO SHOP
                        </span>

                        <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
                            Shopping
                            <br />
                            <span className="text-indigo-400">Reimagined.</span>
                        </h1>

                        <p className="mt-7 max-w-lg text-lg leading-8 text-slate-400">
                            Discover exceptional products, smarter shopping
                            experiences and effortless order management.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                to="/products"
                                className="flex items-center gap-3 rounded-xl bg-indigo-600 px-7 py-4 font-bold text-white transition hover:bg-indigo-500"
                            >
                                Explore Collection
                                <ArrowRight size={19} />
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl border border-slate-600 px-7 py-4 font-bold text-white transition hover:bg-slate-800"
                            >
                                Join VELTRIX
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-5 rounded-full bg-indigo-600/20 blur-3xl" />

                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
                            alt="Modern retail shopping collection"
                            className="relative h-95 w-full rounded-3xl object-cover shadow-2xl md:h-125"
                        />
                    </div>

                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3">
                {benefits.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="rounded-xl bg-indigo-50 p-4 text-indigo-600">
                            <Icon size={25} />
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-950">{title}</h3>
                            <p className="mt-1 text-sm text-slate-500">{description}</p>
                        </div>
                    </div>
                ))}
            </section>

            <section className="mx-auto max-w-7xl px-5 py-16">
                <div className="flex flex-wrap items-end justify-between gap-5">
                    <SectionHeading
                        eyebrow="Handpicked for you"
                        title="Featured Collection"
                        description="Explore selected products from our collection."
                    />

                    <Link
                        to="/products"
                        className="mb-10 flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800"
                    >
                        View all
                        <ArrowRight size={17} />
                    </Link>
                </div>

                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="bg-indigo-600 px-5 py-16 text-center">
                <h2 className="text-3xl font-black text-white md:text-4xl">
                    Your next favorite product awaits.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-indigo-100">
                    Explore our growing collection and discover something extraordinary.
                </p>

                <Link
                    to="/products"
                    className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50"
                >
                    Start Shopping
                </Link>
            </section>
        </div>
    );
}