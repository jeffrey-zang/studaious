import React from 'react'
import Edit from './pages/Edit/Edit'
import Minimal from './pages/Minimal/Minimal'
import logo from './assets/logo.png'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route index element={
        <div>
          <div className='flex items-center justify-center gap-4 my-2'>
            <img src={logo} className='h-8'></img>
            <h1 className='font-bold text-2xl text-center'>studAIous</h1>
          </div>
          <Edit />
        </div>
      } />
      <Route path='/minimal' element={
        <div>
          <div className='flex items-center justify-center gap-4 my-2'>
            <img src={logo} className='h-8'></img>
            <h1 className='font-bold text-2xl text-center'>studAIous</h1>
          </div>
          <Minimal />
        </div>
      } />
    </Routes>
  )
}

export default App