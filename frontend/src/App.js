/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/home.js"
import Login from "./pages/login.js"
import Register from "./pages/register.js"
import Cart from "./pages/cart.js"
import AdminAddProduct from "./pages/adminAddproducts.js"

import Navbar from "./components/Navbar"

function App() {

  return (

    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/admin" element={<AdminAddProduct />} />

      </Routes>

    </Router>

  )
}

export default App*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/home.js"
import Login from "./pages/login.js"
import Register from "./pages/register.js"
import Cart from "./pages/cart.js"
import AdminAddProduct from "./pages/adminAddproducts.js"
import Navbar from "./components/Navbar"
import { ToastProvider } from "./context/ToastContext"

function App() {
  return (
    <Router>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminAddProduct />} />
        </Routes>
      </ToastProvider>
    </Router>
  )
}

export default App