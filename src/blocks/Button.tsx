export default function Button({ children, onClick, disabled, className }: { children: React.ReactNode, onClick: () => void, disabled?: boolean, className?: string }) {
    return (
        <button className={`bg-brand-orange rounded-md text-white px-4 py-2 hover:cursor-pointer hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
    )
}