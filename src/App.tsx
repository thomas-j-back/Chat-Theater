import { ScriptProvider } from '@/providers/ScriptProvider'
import PhoneStage from './components/PhoneStage/PhoneStage'
import Controls from './components/Controls/Controls'
import MainLayout from './components/Layout/MainLayout'
import { ScriptContext } from '@/providers/ScriptProvider'
import { useContext } from 'react'
import './App.css'
import type { ScriptContextType } from './types/Contexts'

function App() {
  const { isEditingScript } = useContext(ScriptContext) as ScriptContextType;
  return (
    <MainLayout isEditing={isEditingScript}>

      {/* Sidebar / Mobile Hamburger Wrapper */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 shadow-xl transform 
        sm:relative sm:translate-x-0 sm:shadow-none bg-transparent
        rounded
        transition-transform duration-300 ease-in-out block -translate-x-full
        ${isEditingScript ? 'md:flex-1 flex-grow' : ''}
      `}>
        <Controls />
      </aside>

      {/* The Phone Stage — off screen when editing at all breakpoints including md */}
      <main className={`
          transition-all duration-700 ease-in-out flex-shrink-0
          ${isEditingScript ? 'translate-x-[150%] opacity-0 scale-75 pointer-events-none display-none md:block' : 'translate-x-0 opacity-100 scale-100 pointer-events-auto'}
      `}>
        <PhoneStage />
      </main>

    </MainLayout>
  )
}

export default App
