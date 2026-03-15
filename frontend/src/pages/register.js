/*import { useState } from "react"
import API from "../services/api"

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      })

      alert("Registered Successfully")

    } catch (error) {

      alert("Registration failed")

    }

  }

  return (

    <div>

      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>

  )

}

export default Register*/


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import { useToast } from "../context/ToastContext"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const showToast = useToast()

  const handleRegister = async () => {
    if (!name || !email || !password) { showToast("Please fill all fields", "error"); return }
    if (password.length < 8) { showToast("Password must be at least 8 characters", "error"); return }
    try {
      await API.post("/auth/register", { name, email, password })
      showToast("Account created successfully! 🎉")
      navigate("/login")
    } catch {
      showToast("Registration failed", "error")
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <div className="auth-visual-icon">⚡</div>
          <h2>Join the<br /><em>Cricket Family</em></h2>
          <p>Create your account and get access to premium cricket equipment, exclusive offers, and a community of cricket enthusiasts.</p>
          <div className="auth-features">
            <div className="auth-feature"><div className="auth-feature-dot" /><span>Free delivery on first order</span></div>
            <div className="auth-feature"><div className="auth-feature-dot" /><span>10% welcome discount</span></div>
            <div className="auth-feature"><div className="auth-feature-dot" /><span>Early access to new arrivals</span></div>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <h2>Create Account</h2>
          <p>Join thousands of cricket enthusiasts</p>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text" className="form-input" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)}
            />
          </div>
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
              type="password" className="form-input" placeholder="Min 8 characters"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleRegister()}
            />
          </div>
          <button className="form-submit" onClick={handleRegister}>Create Account</button>
          <div className="form-footer">
            Already have an account? <a onClick={() => navigate("/login")}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register