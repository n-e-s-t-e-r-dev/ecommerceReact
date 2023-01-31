import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductsId from './pages/ProductsId'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Body from './components/Body'

function App() {
  const [count, setCount] = useState(0)
  const isLoading = useSelector(state => state.isLoading)
  return (
    < HashRouter>
      < AppNavbar />
      {isLoading && < LoadingScreen />}
      <Container className='my-4'>
        < Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsId />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </Container>
      < Body/>
    </HashRouter>
  )
}

export default App
