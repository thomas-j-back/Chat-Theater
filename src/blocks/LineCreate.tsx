import { useState } from "react";
import type { Line } from "@/types/Script";
import { ScriptContext } from "@/providers/ScriptProvider";
import { useContext } from "react";
import type { ScriptContextType } from "@/types/Contexts";
import type { Character } from "@/types/Character";
import Modal from "./Modal";
import Button from "./Button";

export default function LineCreate({ onClose, isOpen }: { onClose: () => void, isOpen: boolean }) {

    const { script, setScript, characters } = useContext(ScriptContext) as ScriptContextType;

    const [line, setLine] = useState<Line>({
        character: null,
        text: "",
        id: crypto.randomUUID(),
        delay: 1,
        typingBubbleDuration: 0
    });


    const updateLine = (line: Line) => {
        setLine(line);
    }

    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(characters[0]);

    const addLine = () => {
        line.character = selectedCharacter;
        setScript({ ...script, lines: [...script.lines, line] });
        onClose();
    }
    //Can I make this a modal 

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Line" className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <label className="text-sm  text-gray-500" htmlFor="character">Character</label>
                <select className="border border-gray-300 p-2 rounded-md" value={selectedCharacter?.id || 'none'} onChange={(e) => setSelectedCharacter(characters.find((c) => c.id === e.target.value) || null)} id="character">
                    {characters.map((character) => (
                        <option key={character.id} value={character.id}>{character.name}</option>
                    ))}
                    {characters.length === 0 && <option value="none">No characters found</option>}
                </select>
                <label className="text-sm  text-gray-500" htmlFor="message">Message</label>
                <input className="border border-gray-300 p-2 rounded-md" type="text" placeholder="Message" value={line?.text || ''} onChange={(e) => updateLine({ ...line, text: e.target.value })} />
                <label className="text-sm  text-gray-500" htmlFor="delay">Delay (seconds)</label>
                <input className="border border-gray-300 p-2 rounded-md" type="number" placeholder="Delay" value={line?.delay || 0} onChange={(e) => updateLine({ ...line, delay: parseInt(e.target.value) })} />
                <label className="text-sm  text-gray-500" htmlFor="typingBubbleDuration">Typing Bubble Duration</label>
                <input className="border border-gray-300 p-2 rounded-md" type="number" placeholder="Typing Bubble Duration" value={line?.typingBubbleDuration || 0} onChange={(e) => updateLine({ ...line, typingBubbleDuration: parseInt(e.target.value) })} />
                <Button disabled={!selectedCharacter || !line.text.trim()} onClick={() => addLine()}>Add Line</Button>
            </div>

        </Modal>
    )

}