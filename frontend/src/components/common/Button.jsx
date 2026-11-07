export default function Button({
    children,
    variant = 'primary',
    type = 'button',
    disabled = false,
    onClick,
    className = ''
}) {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
        dark: 'bg-slate-950 text-white hover:bg-slate-800',
        outline: 'border border-slate-300 text-slate-800 hover:bg-slate-100',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`rounded-xl px-6 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}