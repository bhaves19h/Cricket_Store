/*import { useState,useEffect } from "react"

function Cart() {

  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"))

    if (data) {
      setCartItems(data)
    }
  }, [])

  const removeItem = (index) => {
  const updated = cartItems.filter((_,i)=> i !== index)
  setCartItems(updated)
  localStorage.setItem("cart", JSON.stringify(updated))
  } 

  return (

    <div>

      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

           <button onClick={()=>removeItem(index)}>
           Remove
           </button>  
          </div>
        ))
      )}
     

    </div>

  )

}

export default Cart*/


import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import Footer from "../components/footer"

const CAT_ICONS = { bat: "🏏", ball: "🔴", pad: "🦺", glove: "🧤", helmet: "⛑" }

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const showToast = useToast()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(data)
  }, [])

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index)
    setCartItems(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
    showToast("Item removed from cart", "error")
  }

  const subtotal = cartItems.reduce((s, i) => s + Number(i.price), 0)
  const delivery = subtotal > 2000 ? 0 : 99
  const total = subtotal + delivery

  return (
    <>
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} ready for checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any products yet.</p>
          <button className="btn btn-gold" onClick={() => navigate("/")}>Browse Products</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index} style={{ animation: "slideIn 0.3s ease" }}>
                <div className="cart-item-icon">{CAT_ICONS[item.category] || "🏏"}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cat">{item.category}</div>
                </div>
                <div className="cart-item-price">₹{Number(item.price).toLocaleString("en-IN")}</div>
                <button className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="order-summary-card">
            <div className="summary-title">Order Summary</div>
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>
                {delivery === 0
                  ? <span style={{ color: "#2ECC71", fontWeight: 600 }}>Free</span>
                  : `₹${delivery}`}
              </span>
            </div>
            {delivery > 0 && (
              <div style={{ fontSize: "0.75rem", color: "var(--mist)", padding: "4px 0" }}>
                Add ₹{(2000 - subtotal).toLocaleString("en-IN")} more for free delivery
              </div>
            )}
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => showToast("Order placed successfully! 🎉")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Cart