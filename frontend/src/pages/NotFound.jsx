import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">

            <h1 className="text-8xl font-black text-indigo-600">
                404
            </h1>

            <h2 className="mt-5 text-3xl font-black text-slate-950">
                Page Not Found
            </h2>

            <p className="mt-3 text-slate-500">
                The page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="mt-8 rounded-xl bg-slate-950 px-8 py-4 font-bold text-white"
            >
                Back to Home
            </Link>
        </section>
    );
}