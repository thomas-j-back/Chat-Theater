import { useState, useEffect } from "react";
interface ClickToEditProps {
    label?: string;
    value: string | number;
    type?: "string" | "number";
    onSave: (value: string | number) => void;

}
export default function ClickToEdit({ label, value, type = "string", onSave }: ClickToEditProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const submitSave = () => {
        setIsEditing(false);
        // Only trigger update if the value actually changed
        if (currentValue !== value) {
            onSave(type === "number" ? Number(currentValue) : currentValue);
        }
    };



    return (
        <div className="w-full line-height-1">
            {label && <p className="text-center uppercase text-xs font-bold text-gray-500">{label}</p>}
            {isEditing ? (
                type === 'number' ? <input autoFocus type={"number"} className="text-sm text-wrap w-full rounded-sm p-2" value={currentValue} onKeyDown={(e) => {
                    if (e.key === 'Enter') submitSave();
                    if (e.key === 'Escape') {
                        setCurrentValue(value); // Revert
                        setIsEditing(false);
                    }
                }} onBlur={submitSave} onChange={(e) => { setCurrentValue(e.target.value); }} /> : (
                    <textarea autoFocus rows={2} className="text-sm text-center text-gray-500 text-wrap w-full rounded-sm p-2" value={currentValue} onKeyDown={(e) => {
                        if (e.key === 'Enter') submitSave();
                        if (e.key === 'Escape') {
                            setCurrentValue(value); // Revert
                            setIsEditing(false);
                        }
                    }} onBlur={submitSave} onChange={(e) => { setCurrentValue(e.target.value); }} />)
            ) : (
                <p className="text-sm text-center text-gray-500 rounded-sm hover:opacity-50 hover:cursor-pointer p-2 text-wrap whitespace-pre-wrap break-words" onDoubleClick={() => setIsEditing(true)}>{value}</p>
            )}
        </div>
    )
}