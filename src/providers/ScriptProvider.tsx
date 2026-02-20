import { createContext, useState } from "react";
import type { ScriptContextType } from "@/types/Contexts";
import type { VisibleLine, Script } from "@/types/Script";
import type { Character } from "@/types/Character"
export const ScriptContext = createContext<ScriptContextType | undefined>(undefined);



const INIITAL_ME_CHARACTER: Character = {
    id: crypto.randomUUID(),
    name: "Me",
    perspective: "me",
    color: "#000000"
}

export function ScriptProvider({ children }: { children: React.ReactNode }) {
    //Initialize empty script when first renedered, or pull from local storage if available
    const savedScript = localStorage.getItem('script');
    const savedCharacters = localStorage.getItem('characters');

    const [script, setScript] = useState<Script>(savedScript ? JSON.parse(savedScript) : { title: 'untitled', lines: [] });
    const [characters, setCharacters] = useState<Character[]>(savedCharacters ? JSON.parse(savedCharacters) : [INIITAL_ME_CHARACTER]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEditingScript, setIsEditingScript] = useState(false);

    const [visibleLines, setVisibleLines] = useState<VisibleLine[]>([]);

    const setCharactersGlobal = (characters: Character[]) => {
        setCharacters(characters);
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    const setScriptGlobal = (script: Script) => {
        setScript(script);
        localStorage.setItem('script', JSON.stringify(script));
    }

    const resetScript = () => {
        setVisibleLines([]);
        setIsPlaying(false);
    }

    /**
     * Play script function, handles setting the variables that PhoneScreen will use to rnder
     * 
     * @returns void
     */
    const playScript = async () => {
        if (isPlaying) return;

        setIsPlaying(true);
        setVisibleLines([]);

        for (const line of script.lines) {
            await new Promise(resolve => setTimeout(resolve, line.delay * 1000));

            setVisibleLines(prev => [...prev, { ...line, isTyping: line.typingBubbleDuration > 0 }]);

            await new Promise(resolve => setTimeout(() => {
                resolve(true);
            }, line.typingBubbleDuration * 1000));

            setVisibleLines(prev => {
                const newState = [...prev];
                const lastIndex = newState.length - 1;
                if (lastIndex >= 0) {
                    newState[lastIndex] = { ...newState[lastIndex], isTyping: false };
                }
                return newState;
            });
        }
        setIsPlaying(false);
    }

    return (
        <ScriptContext.Provider value={{
            script,
            setScript: setScriptGlobal, characters, setCharacters: setCharactersGlobal, visibleLines, isPlaying, isEditingScript, setIsEditingScript, playScript, resetScript
        }}>
            {children}
        </ScriptContext.Provider>
    )
}