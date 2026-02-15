export default function Modal({ children, onClose, isOpen, title, className }: { children: React.ReactNode, onClose: () => void, isOpen: boolean, title: string, className: string }) {
    if (!isOpen) return null;
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={onClose}>
                    <div className="bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="px-8 py-2 height-50 flex flex-row justify-center items-center relative">
                            <p className="text-gray-500 text-md">{title}</p>
                            <p className="text-gray-500 hover:cursor-pointer absolute right-3" onClick={onClose}>X</p>
                        </div>
                        <div className={`px-8 py-4 ${className}`}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}