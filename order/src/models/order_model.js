const {
    model,
    Schema
} = require('mongoose')

const OrderSchema = new Schema({
    foods: [{
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        price: {
            type: Number
        },
        totalPrice: {
            type: Number
        }
    }],
    status: {
        type: String,
    },
    created: {
        type: Date,
        default: new Date()
    },

})

module.exports = model('Order', OrderSchema)

// user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
// }