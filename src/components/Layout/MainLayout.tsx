export default function MainLayout({ children, isEditing }: { children: React.ReactNode, isEditing: boolean }) {
    return (
        <div className={`
            min-h-screen w-full transition-all duration-700 ease-in-out
            px-4 py-4 md:px-10 lg:px-20 xl:px-32
            flex flex-col-reverse sm:flex-row gap-12
            /* When editing, we align start so the expansion pushes content right */
            ${isEditing ? 'items-start justify-start overflow-hidden' : 'items-center sm:items-start sm:justify-between justify-center'}
        `}>
            {children}
        </div>
    )
}