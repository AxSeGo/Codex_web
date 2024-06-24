import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-center mt-10">
        <a href="https://vitejs.dev" target="_blank" className="mx-5">
          <img src={viteLogo} className="logo animate-spin-slow h-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="mx-5">
          <img src={reactLogo} className="logo react h-20" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl text-blue-300 font-bold underline">
        Vite + React
      </h1>
      <div className="card bg-gray-100 shadow-xl p-5 m-5">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="mt-3">
          Edit <code className="bg-gray-200 rounded p-1">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-lg text-gray-600 mt-5">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App