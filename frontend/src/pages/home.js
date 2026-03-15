/*import { useEffect, useState } from "react"
import API from "../services/api"
import ProductCard from "../components/productCard"

function Home() {

  const [products, setProducts] = useState([])
//  const [cart, setItems] = useState([])
  useEffect(() => {

    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))

  }, [])

    const addToCart = (product) => {

    let existingCart = JSON.parse(localStorage.getItem("cart")) || []

    existingCart.push(product)

    localStorage.setItem("cart", JSON.stringify(existingCart))

    console.log("Cart Updated:", existingCart)
  }

  return (

    <div>

      <h1>Cricket Products</h1>

      {products.map(product => (

        <ProductCard key={product._id} product={product} addToCart={addToCart} />

      ))}

    </div>

  )

}

export default Home*/

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import ProductCard from "../components/productCard"
import { useToast } from "../context/ToastContext"
import Footer from "../components/footer"

const FILTERS = ["all", "bat", "ball", "pad", "glove", "helmet"]

function Home() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState("all")
  const navigate = useNavigate()
  const showToast = useToast()

  useEffect(() => {
    API.get("/products")
      .then(res => {
        const data = res.data
        setProducts(Array.isArray(data) ? data : data.products || data.data || [])
      })
      .catch(err => console.log(err))
  }, [])

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]")
    existing.push(product)
    localStorage.setItem("cart", JSON.stringify(existing))
    window.dispatchEvent(new Event("cartUpdated"))
    showToast(`${product.name} added to cart`)
  }

  const filtered = filter === "all" ? products : products.filter(p => p.category?.toLowerCase() === filter)

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        <div>
          <div className="hero-eyebrow">Premium Cricket Equipment</div>
          <h1 className="hero-title">Play Like a<br /><em>Champion</em></h1>
          <p className="hero-subtitle">
            Discover handpicked cricket gear trusted by professionals. From willow to whites —
            everything for the serious cricketer.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-gold"
              onClick={() => document.getElementById("products-section").scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now →
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-number">200+</div><div className="stat-label">Products</div></div>
            <div><div className="stat-number">50k+</div><div className="stat-label">Orders</div></div>
            <div><div className="stat-number">4.9★</div><div className="stat-label">Rating</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-badge-ring">
            <div className="hero-badge-inner">
              <div className="big-icon">🏏</div>
              <p>Premium Gear</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div className="section" id="products-section">
        <div className="section-header">
          <div className="section-title">Our Products</div>
          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-tab${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home