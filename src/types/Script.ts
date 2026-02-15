import type { Character } from "./Character";

export type Script = {
    title: string
    lines: Line[]
}

export type VisibleLine = Line & {
    isTyping: boolean;
}

export type Line = {
    character: Character | null;
    id: string,
    text: string;
    delay: number;
    typingBubbleDuration: number;
}