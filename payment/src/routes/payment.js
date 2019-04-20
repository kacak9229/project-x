const router = require('express').Router()


/**
 * /v1/payment API will be called from Order API
 */
router.post("/v1/payment", async (req, res) => {
    // Check the response if both microservice is communicating or not
    console.log(req.body)
    try {
        // 
        let response;
        const {
            card_number,
            month,
            year,
            cvc,
        } = req.body

        // If 0 confirmed if 1 declined
        const randomResponse = Math.round(Math.random())
        res.status(200).json({
            success: true,
            data: randomResponse
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})



module.exports = router