// src/components/shared/PageHeader.tsx
export default function PageHeader({ title, description, image }: { title: string, description: string, image?: string }) {
    return (
        <div className="relative bg-muted py-24 px-5 overflow-hidden flex items-center justify-center text-center">
            {image && (
                <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-multiply" style={{ backgroundImage: `url(${image})` }} />
            )}
            <div className="relative z-10 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-playfair font-black text-primary mb-6">{title}</h1>
                <p className="text-lg text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}