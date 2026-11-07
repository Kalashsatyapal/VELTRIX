import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-5 py-10">

            <Link to="/" className="mb-8 text-3xl font-black tracking-tight text-white">
                VELTRIX<span className="text-indigo-400">.</span>
            </Link>

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                <Outlet />
            </div>

            <p className="mt-8 text-sm text-slate-400">
                VELTRIX Commerce Platform
            </p>

        </div>
    );
}