import type { Line } from "@/types/Script";
import { ScriptContext } from "@/providers/ScriptProvider";
import { useContext } from "react";
import type { ScriptContextType } from "@/types/Contexts";
import LineEditBlock from "./LineEditBlock";
import ClickToEdit from "./ClickToEdit";

export default function LineEditor() {
    const { script, setScript, characters } = useContext(ScriptContext) as ScriptContextType;


    //When the line is edited in the edit block, update the script object with new line
    const updateLine = (line: Line) => {
        setScript({ ...script, lines: script.lines.map((l) => l.id === line.id ? line : l) });
    }

    const updateTitle = (title: string) => {
        setScript({ ...script, title: title });
    }

    const deleteLine = (id: string) => {
        setScript({ ...script, lines: script.lines.filter((l) => l.id !== id) });
    }


    return (
        <div className="font-courier flex flex-col lg:flex-row gap-2 sm:p-2 md:p-4 lg:p-8 p-4 h-full bg-white rounded-sm w-full h-full max-h-[500px] shadow-lg overflow-hidden">
            <div className="flex flex-col flex-1 min-w-0 h-full overflow-y-auto scrollbar-thin">
                <ClickToEdit value={script.title} type="string" onSave={(value: string | number) => updateTitle(value as string)} />

                {script.lines.map((line) => (
                    <LineEditBlock key={line.id} line={line} updateLine={updateLine} onDelete={deleteLine} />
                ))}
                {script.lines.length === 0 && <p className="text-gray-500 text-sm text-center">[ The stage is empty. ]</p>}
            </div>
            <div className="text-gray-500 flex flex-col  border-l-2 border-gray-200 pl-4">
                <p className="text-center">Cast List:</p>
                {characters.map((character) => (
                    <p className="text-center" key={character.id}>{character.name}</p>
                ))}
            </div>
        </div>
    )
}