import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header/Header'
import QueryEditor from './components/QueryEditor/QueryEditor'
import { AppProvider } from './context/AppContext'
import ResultsTable from './components/ResultTable.jsx/ResultTable'
import QuerySelector from './components/QuerySelector/QuerySelector'
import './App.css'

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Header />
        <QueryEditor />
        <QuerySelector />
        <ResultsTable />

      </div>
    </AppProvider>
  )
}

export default App