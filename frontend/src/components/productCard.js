//import API from "../services/api"
//function ProductCard({ product,addToCart }) {
//const role  = localStorage.getItem("role")
/*
const deleteProduct = async () => {

    try {

      await API.delete(`/products/${product._id}`)

      alert("Product Deleted")

      window.location.reload()

    } catch (error) {

      console.log(error)
    }
    }     {role === "admin" && (
        <button onClick={deleteProduct}>
          Delete
        </button>
      )}*/
/*
  return (

    <div>

      <h3>{product.name}</h3>

      <p>{product.category}</p>

      <p>₹{product.price}</p>

       <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    
    </div>

  )

}

export default ProductCard/*/

import { useState } from "react"

const CAT_ICONS = { bat: "🏏", ball: "🔴", pad: "🦺", glove: "🧤", helmet: "⛑" }

function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <span style={{ fontSize: 64 }}>{CAT_ICONS[product.category] || "🏏"}</span>
        <div className="product-category-badge">{product.category}</div>
      </div>
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <div className="product-sub">Premium cricket equipment</div>
        <div className="product-footer">
          <div className="product-price">₹{Number(product.price).toLocaleString("en-IN")}</div>
          <button
            className={`add-btn${added ? " added" : ""}`}
            onClick={handleAdd}
            title="Add to cart"
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard