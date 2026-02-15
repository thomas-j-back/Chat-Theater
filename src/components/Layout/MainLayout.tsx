export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="sm:px-4 sm:py-2 md:px-10 md:py-4 lg:px-20 lg:py-8 xl:px-32 xl:py-16 flex flex-row gap-12 items-start justify-between">
            {children}
        </div>
    )
}