import type { Line } from "@/types/Script";
import { useState, useEffect } from "react";
import ClickToEdit from "./ClickToEdit";
import { Trash2 } from "lucide-react";
interface LineEditBlockProps {
    line: Line;
    updateLine: (line: Line) => void;
    onDelete: (id: string) => void;
}

export default function LineEditBlock({ line, updateLine, onDelete }: LineEditBlockProps) {

    const [isEditingMessage, setIsEditingMessage] = useState(false);
    const [message, setMessage] = useState(line.text);

    //When rerendered, ensure we keep the message in sync with the line text
    useEffect(() => {
        setMessage(line.text);
    }, [line.text]);


    /**
   * Handle the save of the message on closeout
   */
    const handleFieldSave = (fieldName: keyof Line, newValue: string | number) => {
        updateLine({
            ...line,
            [fieldName]: newValue
        });
    };




    return (
        <div className={`hover:border  hover:border-gray-100 hover:bg-gray-100 transition-colors group relative p-2 rounded-md text-white flex flex-row justify-between nowrap sm:flex-wrap`}>
            <div className="absolute left-0 top-0  flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onDelete(line.id)}
                    className="p-2 hover:cursor-pointer hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-md transition-colors"
                    title="Delete Line"
                >
                    <Trash2 size={14} />
                </button>
                {/* You could add a 'Move Up/Down' button here too */}
            </div>
            <div className="w-full">
                <ClickToEdit label={line.character?.name || ''} value={line?.text || ''} type="string" onSave={(value) => handleFieldSave('text', value)} />
            </div>
            {/* <div id="timing-controls">
                <ClickToEdit label="Delay" value={line.delay} type="number" onSave={(value) => handleFieldSave('delay', value)} />
                <ClickToEdit label="Typing Duration" value={line.typingBubbleDuration} type="number" onSave={(value) => handleFieldSave('typingBubbleDuration', value)} />
            </div> */}
        </div>)

}