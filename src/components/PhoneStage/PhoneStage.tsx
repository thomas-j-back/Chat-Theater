import './PhoneStage.css'
import { useContext, useRef, useEffect } from 'react'
import { ScriptContext } from '@/providers/ScriptProvider'
import type { ScriptContextType } from '@/types/Contexts';
import ChatBubble from '../ChatBubble/ChatBubble';
import { AnimatePresence } from 'framer-motion';

export default function PhoneStage() {
    const { visibleLines } = useContext(ScriptContext) as ScriptContextType;
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [visibleLines]);

    return (
        <div className="phone">
            <div className="chat-box scrollbar-thin">
                <AnimatePresence>
                    {visibleLines.map((line, index) => (
                        <ChatBubble
                            key={`${line.id}-${index}`}
                            text={line.text}
                            isTyping={line.isTyping}
                            character={line.character}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
