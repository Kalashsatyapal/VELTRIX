export default function SectionHeading({ eyebrow, title, description }) {
    return (
        <div className="mb-10">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
                {eyebrow}
            </p>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                {title}
            </h2>

            {description && (
                <p className="mt-3 max-w-2xl text-slate-500">
                    {description}
                </p>
            )}
        </div>
    );
}