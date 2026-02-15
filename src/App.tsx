import {ScriptProvider} from '@/providers/ScriptProvider'
import PhoneStage from './components/PhoneStage/PhoneStage'
import Controls from './components/Controls/Controls'
import MainLayout from './components/Layout/MainLayout'
import './App.css'

function App() {

  return (
    <MainLayout>
      <ScriptProvider>
        <Controls />
        <PhoneStage />
      </ScriptProvider>
    </MainLayout>
  )
}

export default App
