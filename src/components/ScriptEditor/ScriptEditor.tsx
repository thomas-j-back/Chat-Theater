import { useContext, useEffect, useState } from "react";
import Button from "@/blocks/Button";
import LineCreate from "@/blocks/LineCreate";
import LineEditor from "@/blocks/LineEditor";
import CharacterCreate from "@/blocks/CharacterCreate";

export default function ScriptEditor({ onClose }: { onClose: () => void }) {
    const [isCreatingLine, setIsCreatingLine] = useState(false);
    const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);

    const createLine = () => {
        setIsCreatingLine(true);
    }

    const createCharacter = () => {
        setIsCreatingCharacter(true);
    }

    return (
        <>
            <LineCreate key={isCreatingLine ? "line-open" : "line-closed"} onClose={() => setIsCreatingLine(false)} isOpen={isCreatingLine} />
            <CharacterCreate key={isCreatingCharacter ? "open" : "closed"} onClose={() => setIsCreatingCharacter(false)} isOpen={isCreatingCharacter} />
            <div className="bg-gray-800 rounded-lg w-full h-full ">
                <div className="px-2 py-1 height-50 flex flex-row justify-end">
                    <p className="text-white hover:cursor-pointer" onClick={onClose}>X</p>
                </div>

                <div className="sm:p-4 md:p-8 lg:p-12 p-4 pt-0 md:pt-0 lg:pt-0 h-full">
                    <div className="flex flex-col gap-4 h-full">
                        <h2 className="text-white text-2xl">Script Editor</h2>
                        <LineEditor />
                        <div className="flex flex-row gap-4 justify-between">
                            <div className="flex flex-row gap-4">
                                <Button onClick={createCharacter}>Add Character</Button>
                                <Button onClick={createLine}>Add Line</Button>
                            </div>
                            <div>
                                <Button onClick={onClose}>Done</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}