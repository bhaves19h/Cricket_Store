const Order = require("../models/order")

// CREATE ORDER
exports.createOrder = async (req, res) => {

  try {

    const order = await Order.create({
      userId: req.user.id,
      products: req.body.products,
      totalPrice: req.body.totalPrice
    })

    res.json(order)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}


// GET ALL ORDERS
exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find()

    res.json(orders)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}