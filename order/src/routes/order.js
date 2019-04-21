const router = require('express').Router()
const axios = require('axios')
const Order = require('../models/order_model.js')
const User = require('../models/user_model.js')



/**
 * /v1/order API will handle the req.body data
 * and call the payment API to handle the Mock detail
 */
router.post("/v1/order", (req, res) => {

    // Mocked User info
    const user = new User({
        name: "Naufal",
        email: "naufal_yahaya@hotmail.com"
    })

    const responseOrder = req.body.order
    const order = new Order()

    responseOrder.forEach((foodOrder) => {
        order.foods.push({
            name: foodOrder.order.name,
            image: foodOrder.order.featured_image,
            price: foodOrder.order.price,
        })
    })

    // change status to created
    order.status = "created"
    order.totalPrice = req.body.totalPrice
    order.user = user


    // Calling the Payment API and check the response

    axios.post('http://payment:3000/api/v1/payment', {
            order: order
        })
        .then(function (response) {
            // Success change the order status to confirmed
            console.log(response)
            if (response.data.data === 0) {
                order.status = "confirmed"
            } else {
                order.status = "declined"
            }

            order.save()
            res.status(200).json({
                success: true,
                paymentResponse: response.data.data,
                order: order
            })
        })
        .catch(function (error) {
            console.log(error);
        });
})

/**
 * /v1/order/change-status/:id API will change the status
 * from Confirmed -> Delivered
 */
router.post('/v1/order/change-status/:id', async (req, res) => {
    try {
        const foundOrder = await Order.findOne({
            _id: req.params.id
        })

        foundOrder.status = "delivered"
        foundOrder.save()
        res.json({
            success: 200,
            order: foundOrder
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

/**
 * /v1/order/all -- Get all the Order data
 */
router.get('/v1/order/all', async (req, res) => {
    try {
        const foundOrders = await Order.find()
        res.json({
            success: 200,
            orders: foundOrders
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

/**
 * /v1/order/:id -- Get a single Order data
 * based on the req.params.id
 */
router.get('/v1/order/:id', async (req, res) => {
    try {
        const foundOrder = await Order.findOne({
            _id: req.params.id
        })
        res.json({
            success: 200,
            order: foundOrder
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

/**
 * /v1/order/:id -- Change the status from Confirmed or Created
 * -> Cancel
 */
router.post('/v1/order/cancel/:id', async (req, res) => {
    try {
        const foundOrder = await Order.findOne({
            _id: req.params.id
        })

        foundOrder.status = "declined"
        foundOrder.save()

        res.json({
            success: 200,
            order: foundOrder
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router