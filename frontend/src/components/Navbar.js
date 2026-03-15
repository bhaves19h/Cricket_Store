/*import { Link } from "react-router-dom"

function Navbar() {
const role = localStorage.getItem("role")
  return (

    <nav>

      <h2>Cricket Kit Store</h2>

      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      {role === "admin" && (
        <Link to="/admin">Admin</Link>
      )}

    </nav>

  )

}

export default Navbar*/

import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const updateNav = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartCount(cart.length)
      setIsAdmin(localStorage.getItem("role") === "admin")
    }
    updateNav()
    window.addEventListener("storage", updateNav)
    window.addEventListener("cartUpdated", updateNav)
    return () => {
      window.removeEventListener("storage", updateNav)
      window.removeEventListener("cartUpdated", updateNav)
    }
  }, [])

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <div className="brand-icon">🏏</div>
          <span className="brand-text">Cricket <span>Kit</span> Store</span>
        </div>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/cart">
            Cart <span className="cart-badge">{cartCount}</span>
          </Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
          {isAdmin && (
            <Link className="nav-link" to="/admin">Admin Panel</Link>
          )}
        </div>
      </nav>
      <div className="cricket-line" />
    </>
  )
}

export default Navbar