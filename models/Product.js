const { model, Schema } = require('mongoose');

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        desc: {
            type: String,
            required: true
        },

        img: {
            type: String,
            required: true
        },

        categories: {
            type: Array
        },

        size: {
            type: Array
        },

        color: [
            {
                colorId: { type: String, required: true },
                name: { type: String, required: true },
                images: { type: Array, required: true }
            }
        ],

        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }

);

module.exports = model('Product', ProductSchema)