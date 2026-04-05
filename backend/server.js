const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")

dotenv.config()

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// database
connectDB()

// routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("Cricket Store API is Running")
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
