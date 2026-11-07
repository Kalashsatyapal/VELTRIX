import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, UserRound } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/products' },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

                <Link to="/" className="text-2xl font-black tracking-tight text-slate-950">
                    VELTRIX<span className="text-indigo-600">.</span>
                </Link>

                <nav className="hidden items-center gap-9 md:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-semibold transition ${
                                    isActive
                                        ? 'text-indigo-600'
                                        : 'text-slate-600 hover:text-indigo-600'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden items-center gap-5 md:flex">
                    <Link to="/products" aria-label="Search products">
                        <Search size={20} className="text-slate-700" />
                    </Link>

                    <Link to="/login" aria-label="Account">
                        <UserRound size={20} className="text-slate-700" />
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                    >
                        <ShoppingBag size={17} />
                        Cart
                    </Link>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-slate-900 md:hidden"
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? <X size={25} /> : <Menu size={25} />}
                </button>
            </div>

            {menuOpen && (
                <nav className="flex flex-col gap-5 border-t border-slate-200 bg-white px-6 py-6 md:hidden">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className="font-semibold text-slate-700"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link to="/cart" onClick={() => setMenuOpen(false)}>
                        Shopping Cart
                    </Link>

                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                        My Account
                    </Link>
                </nav>
            )}
        </header>
    );
}