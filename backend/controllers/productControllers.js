const Product = require("../models/product")

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  
  try {

    const products = await Product.find()

    res.json(products)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}


// ADD PRODUCT (ADMIN)
exports.addProduct = async (req, res) => {
 if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can add products" })
  }
  try {

    const product = await Product.create(req.body)

    res.json(product)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can delete products" })
  }

  try {

    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}
/*
exports.deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id)

    res.json({ message: "Product deleted" })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}*/