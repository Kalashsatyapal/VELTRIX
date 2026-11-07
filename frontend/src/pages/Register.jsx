import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/common/Button';

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
    };

    return (
        <div>
            <h1 className="text-3xl font-black text-slate-950">
                Create Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
                Join VELTRIX and discover a smarter shopping experience.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">

                {[
                    { name: 'name', label: 'Full Name', type: 'text' },
                    { name: 'email', label: 'Email Address', type: 'email' },
                    { name: 'password', label: 'Password', type: 'password' },
                    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
                ].map(field => (
                    <div key={field.name}>
                        <label className="mb-2 block text-sm font-bold">
                            {field.label}
                        </label>

                        <input
                            type={field.type}
                            required
                            value={form[field.name]}
                            onChange={e => setForm({
                                ...form,
                                [field.name]: e.target.value
                            })}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                        />
                    </div>
                ))}

                {error && (
                    <p className="text-sm font-semibold text-red-600">
                        {error}
                    </p>
                )}

                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                Already registered?{' '}
                <Link to="/login" className="font-bold text-indigo-600">
                    Sign In
                </Link>
            </p>
        </div>
    );
}