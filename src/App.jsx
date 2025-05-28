import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
import Logs from './pages/logs'

function App() {
  return (
    <>
      {/* <h1>Vite + React</h1> */}
      <Login/>
      <Logs/>

    </>
  )
}

export default App
