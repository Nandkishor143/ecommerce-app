import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Cart from './pages/Cart'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
const App = () => {
  const user = false;
  // const Navigate = useNavigate();
  return (
    <>
      <Router>
        <Routes>
          <Route index path='/' element={<Home />}/>
          <Route  path='/products/:category' element={<ProductList />}/>
          <Route  path='/product/:id' element={<Product />}/>
          <Route  path='/cart' element={<Cart />}/>
          <Route  path='/login' element={user ? <Navigate to= "/" /> : <Login />}/>
          <Route  path='/register' element={<Register />}/>
        </Routes>
      </Router>
      {/* <Home/> */}
      {/* <ProductList /> */}
      {/* <Product /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
    </>
  )
}

export default App
