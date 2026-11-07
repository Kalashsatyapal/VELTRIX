import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/common/Button';

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1 className="text-3xl font-black text-slate-950">
                Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
                Sign in to your VELTRIX account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                <div>
                    <label className="mb-2 block text-sm font-bold">Email Address</label>

                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-bold">Password</label>

                    <input
                        type="password"
                        required
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                        placeholder="Enter your password"
                    />
                </div>

                <Button type="submit" className="w-full">
                    Sign In
                </Button>

            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-indigo-600">
                    Create Account
                </Link>
            </p>
        </div>
    );
}