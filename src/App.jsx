import React from 'react'
import Edit from './pages/Edit/Edit'
import logo from './assets/logo.png'

const App = () => {
  return (
    <div>
      <div className='flex items-center justify-center gap-4 my-2'>
        <img src={logo} className='h-8'></img>
        <h1 className='font-bold text-2xl text-center'>studAIous</h1>
      </div>
      <Edit />
    </div>
  )
}

export default App