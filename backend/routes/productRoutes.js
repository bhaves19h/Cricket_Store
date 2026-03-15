const express = require("express")
const router = express.Router()


const {
  getProducts,
  addProduct,
  deleteProduct
} = require("../controllers/productControllers")

const authMiddleware = require("../middleware/authMiddleware")

router.get("/", getProducts)

router.post("/", authMiddleware, addProduct)

router.delete("/:id", authMiddleware, deleteProduct)

module.exports = router