import type { Character } from "@/types/Character";
import './ChatBubble.scss';

type ChatBubbleProps = {
    text: string;
    isTyping: boolean;
    character: Character | null;

}

export default function ChatBubble({ text, isTyping, character }: ChatBubbleProps) {


    return (
        <div className={`${character?.perspective === 'me' ? 'self-end' : 'self-start'} max-w-[80%]`}>
            {character?.perspective === 'me' ? '' : <p className={'text-gray-500 font-bold text-xs mb-1'}>{character?.name}</p>}
            <div className={`${character?.perspective === 'me' ? 'bg-ios-blue' : 'bg-ios-green'} rounded-md p-1`}>
                <div className="flex items-center gap-1 px-1 py-2 text-white text-xs w-full">
                    {isTyping ? (
                        <div className="flex items-center gap-1 px-1 py-2">
                            <span className={`h-1 w-1 rounded-full bg-white  animate-typing-dot dot-delay-1`}></span>
                            <span className={`h-1 w-1 rounded-full bg-white animate-typing-dot dot-delay-2`}></span>
                            <span className={`h-1 w-1 rounded-full bg-white animate-typing-dot`}></span>
                        </div>
                    ) : (
                        <p className="text-wrap whitespace-pre-wrap break-words text-white text-sm">{text}</p>
                    )}
                </div>
            </div>
        </div>
    )

}