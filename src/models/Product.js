const { model, Schema } = require('mongoose');

const ProductSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },

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

        price: {
            type: Number,
            required: true
        },

        categories: {
            type: Array,
            required: true
        },

        sizes: {
            type: Array,
            required: true
        },

        colors: [
            {
                colorName: { type: String, required: true },
                colorImages: { type: Array, required: true }
            }
        ]
    },
    {
        timestamps: true
    }

);

module.exports = model('Product', ProductSchema)