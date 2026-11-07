import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3">

                <div>
                    <Link to="/" className="text-3xl font-black tracking-tight">
                        VELTRIX<span className="text-indigo-400">.</span>
                    </Link>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                        Discover a smarter way to shop. Explore quality products,
                        seamless checkout and a modern shopping experience.
                    </p>
                </div>

                <div>
                    <h3 className="mb-5 font-bold">Explore</h3>

                    <div className="flex flex-col gap-4 text-sm text-slate-400">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <Link to="/products" className="hover:text-white">Shop</Link>
                        <Link to="/cart" className="hover:text-white">Shopping Cart</Link>
                        <Link to="/login" className="hover:text-white">My Account</Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-5 font-bold">Connect</h3>

                    <div className="flex gap-4">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <Instagram />
                        </a>

                        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <Facebook />
                        </a>

                        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                            <Twitter />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 px-5 py-6 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} VELTRIX. All rights reserved.
            </div>
        </footer>
    );
}