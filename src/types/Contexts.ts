import type { Character } from "./Character";
import type { Script } from "./Script";
import type { VisibleLine } from "./Script";

export type ScriptContextType = {
    //UI state
    isEditingScript: boolean;
    setIsEditingScript: (isEditing: boolean) => void;

    //Script state
    script: Script;
    characters: Character[];
    visibleLines: VisibleLine[];
    isPlaying: boolean;
    //Script actions
    setScript: (script: Script) => void;
    setCharacters: (characters: Character[]) => void;
    playScript: () => Promise<void>;
    resetScript: () => void;
}