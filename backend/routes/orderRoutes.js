const express = require("express")
const router = express.Router()

const {
  createOrder,
  getOrders
} = require("../controllers/orderControllers")

const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, createOrder)

router.get("/", authMiddleware, getOrders)

module.exports = router