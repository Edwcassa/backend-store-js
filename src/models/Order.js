const { model, Schema } = require('mongoose');

const OrderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                "price": {
                    type: Number,
                    required: true
                },
                "size": {
                    type: String,
                    default: 1
                },
                "colorName": {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],

        amount: {
            type: Number,
            required: true
        },

        totalPrice: {
            type: Number,
            required: true
        },

        address: {
            type: Object,
            required: true
        },

        status: {
            type: String,
            default: 'pending'
        }
    },
    {
        timestamps: true
    }

);

module.exports = model('Order', OrderSchema)