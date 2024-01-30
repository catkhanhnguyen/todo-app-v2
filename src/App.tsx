import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import DetailPage from './pages/Detail/DetailPage'


const App: React.FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
