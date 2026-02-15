import { useState } from "react";
import type { Character } from "@/types/Character";
import { ScriptContext } from "@/providers/ScriptProvider";
import { useContext } from "react";
import type { ScriptContextType } from "@/types/Contexts";
import Modal from "./Modal";
import Button from "./Button";

export default function CharacterCreate({ onClose, isOpen }: { onClose: () => void, isOpen: boolean }) {

    const { characters, setCharacters } = useContext(ScriptContext) as ScriptContextType;



    const [character, setCharacter] = useState<Character>({
        id: crypto.randomUUID(),
        name: "",
        perspective: "other",
        color: ""
    });

    const addCharacter = () => {
        setCharacters([...characters, character]);
        onClose();
    }


    return (

        <Modal isOpen={isOpen} onClose={onClose} title="Add Character" className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <input className="border border-gray-300 p-2 rounded-md" type="text" placeholder="Joseph Smith..." value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} id="name" />
            </div>
            <Button disabled={!character.name || !character.perspective} onClick={() => addCharacter()}>Add Character</Button>
        </Modal >
    )
}