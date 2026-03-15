const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Order", orderSchema)