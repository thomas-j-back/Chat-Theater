import { useState, useEffect, useRef } from "react";
interface ClickToEditProps {
    label?: string;
    value: string | number;
    type?: "string" | "number";
    onSave: (value: string | number) => void;

}
export default function ClickToEdit({ label, value, type = "string", onSave }: ClickToEditProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setCurrentValue(value);

        if (isEditing) {
            adjustHeight();
        }
    }, [value, isEditing]);

    const adjustHeight = () => {
        const textarea = textAreaRef.current;
        if (textarea) {
            // Reset height to shrink if text was deleted
            textarea.style.height = 'auto';
            // Set height to the scroll height (the actual content size)
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };


    const submitSave = () => {
        setIsEditing(false);
        // Only trigger update if the value actually changed
        if (currentValue !== value) {
            onSave(type === "number" ? Number(currentValue) : currentValue);
        }
    };

    return (
        <div className="w-full line-height-1 flex flex-col items-center justify-center">
            {label && <p className="text-center uppercase text-xs font-bold text-gray-500">{label}</p>}
            {isEditing ? (
                type === 'number' ? <input autoFocus type={"number"} className="text-sm text-wrap w-full rounded-sm p-2" value={currentValue} onKeyDown={(e) => {
                    if (e.key === 'Enter') submitSave();
                    if (e.key === 'Escape') {
                        setCurrentValue(value); // Revert
                        setIsEditing(false);
                    }
                }} onBlur={submitSave} onChange={(e) => { setCurrentValue(e.target.value); adjustHeight(); }} /> : (
                    <textarea autoFocus style={{ minHeight: '1.25rem' }} ref={textAreaRef} className="bg-gray-200 outline-none text-sm text-center text-gray-500 text-wrap w-full rounded-sm p-2" value={currentValue} onKeyDown={(e) => {
                        if (e.key === 'Enter') submitSave();
                        if (e.key === 'Escape') {
                            setCurrentValue(value); // Revert
                            setIsEditing(false);
                        }
                    }} onBlur={submitSave} onChange={(e) => { setCurrentValue(e.target.value); }} />)
            ) : (
                <span className="max-w-full text-sm text-center hover:cursor-text text-gray-500 rounded-sm hover:opacity-50 hover:cursor-pointer p-2 text-wrap whitespace-pre-wrap break-words" onDoubleClick={() => setIsEditing(true)}>{value}</span>
            )}
        </div>
    )
}