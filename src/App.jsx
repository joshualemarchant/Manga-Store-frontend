import { useState } from 'react'
import NavbarComp from './components/NavbarComp'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {  
  return (
    <div>
      <NavbarComp/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
