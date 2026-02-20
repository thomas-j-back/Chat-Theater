import ScriptEditor from '@/components/ScriptEditor/ScriptEditor'
import { useState, useContext } from 'react';
import './Controls.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { ScriptContext } from '@/providers/ScriptProvider';
import type { ScriptContextType } from '@/types/Contexts';
import Button from '@/blocks/Button';
import { Play, Square } from 'lucide-react';

export default function Controls() {
    const { playScript, resetScript, isPlaying, isEditingScript, setIsEditingScript } = useContext(ScriptContext) as ScriptContextType;

    return (

        <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`bg-white border rounded-xl overflow-hidden  shadow-sm ${isEditingScript ? 'flex-1' : 'w-64'
                }`}
        >

            <div className="p-4 font-courier">
                <AnimatePresence mode="wait">
                    {!isEditingScript ? (
                        <motion.div
                            key="buttons"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-2"
                        >

                            <Button
                                onClick={() => setIsEditingScript(true)}
                            >
                                Edit Script
                            </Button>
                            <Button disabled={isPlaying} onClick={playScript} className="flex flex-row items-center justify-center">
                                <Play size={24} fill="currentColor" className="ml-1" />
                            </Button>
                            <Button disabled={!isPlaying} onClick={resetScript} className="flex flex-row items-center justify-center">
                                <Square size={24} fill="currentColor" className="ml-1" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="editor"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <ScriptEditor onClose={() => setIsEditingScript(false)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>

    )
}