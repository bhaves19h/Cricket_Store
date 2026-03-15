import { useNavigate } from "react-router-dom"

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <div className="brand-icon" style={{ width: 32, height: 32, fontSize: 16 }}>🏏</div>
            <span className="brand-text" style={{ fontSize: "1.1rem" }}>
              Cricket <span>Kit</span> Store
            </span>
          </div>
          <p className="footer-desc">
            Your trusted destination for premium cricket equipment. Gear up, play hard.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Shop</div>
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate("/")}>All Products</button>
            <button className="footer-link">Cricket Bats</button>
            <button className="footer-link">Protective Gear</button>
            <button className="footer-link">Accessories</button>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Account</div>
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate("/login")}>Login</button>
            <button className="footer-link" onClick={() => navigate("/register")}>Register</button>
            <button className="footer-link" onClick={() => navigate("/cart")}>My Cart</button>
            <button className="footer-link">Orders</button>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Support</div>
          <div className="footer-links">
            <button className="footer-link">Contact Us</button>
            <button className="footer-link">Returns Policy</button>
            <button className="footer-link">Shipping Info</button>
            <button className="footer-link">FAQ</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Cricket Kit Store. All rights reserved.</p>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer