/*import { useState } from "react"
import API from "../services/api"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.user.role) 
      alert("Login successful")

    } catch (error) {

      alert("Login failed")

    }

  }

  return (

    <div>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  )

}

export default Login*/

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import { useToast } from "../context/ToastContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const showToast = useToast()

  const handleLogin = async () => {
    if (!email || !password) { showToast("Please fill all fields", "error"); return }
    try {
      const res = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.user.role)
      window.dispatchEvent(new Event("cartUpdated"))
      showToast(res.data.user.role === "admin" ? "Logged in as Admin! Welcome 👑" : "Login successful! Welcome back 🏏")
      navigate("/")
    } catch {
      showToast("Invalid credentials", "error")
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <div className="auth-visual-icon">🏏</div>
          <h2>Welcome back to<br /><em>Cricket Kit Store</em></h2>
          <p>Sign in to track your orders, save wishlists, and get exclusive member deals.</p>
          <div className="auth-features">
            <div className="auth-feature"><div className="auth-feature-dot" /><span>Order tracking & history</span></div>
            <div className="auth-feature"><div className="auth-feature-dot" /><span>Exclusive member discounts</span></div>
            <div className="auth-feature"><div className="auth-feature-dot" /><span>Fast checkout experience</span></div>
            <div className="auth-feature"><div className="auth-feature-dot" /><span>Priority customer support</span></div>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <h2>Sign In</h2>
          <p>Enter your credentials to continue</p>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email" className="form-input" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password" className="form-input" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>
          <button className="form-submit" onClick={handleLogin}>Sign In</button>
          <div className="form-footer">
            Don't have an account? <a onClick={() => navigate("/register")}>Create one</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login