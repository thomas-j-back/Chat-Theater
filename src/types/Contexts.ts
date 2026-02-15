import type { Character } from "./Character";
import type { Script } from "./Script";
import type { VisibleLine } from "./Script";

export type ScriptContextType = {
    script: Script;
    characters: Character[];
    visibleLines: VisibleLine[];
    isPlaying: boolean;
    setScript: (script: Script) => void;
    setCharacters: (characters: Character[]) => void;
    playScript: () => void;
    resetScript: () => void;
}