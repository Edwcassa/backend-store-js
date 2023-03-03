const User = require("../models/User")
const Order = require("../models/Order")
const { validateProductsInOrder } = require('../helpers/validateProductsInOrder')

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find()
        res.status(200).json({
            ok: true,
            orders: allOrders
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const getOrderById = async (req, res) => {
    const id = req.params.id
    try {
        const myOrder = await Order.findById(id)
        if (!myOrder) return res.json({
            ok: false,
            msg: 'No fue encontrado'
        })
        res.status(200).json({
            ok: true,
            order: myOrder
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const createOrder = async (req, res) => {
    const { body } = req
    // body.userId
    // body.products  --> array

    try {
        if (!body.userId) return res.json({ ok: false, msg: 'Usuario es requerido' })
        if (body.userId === "") return res.json({ ok: false, msg: 'Usuario es requerido' })
        if (!body.products) return res.json({ ok: false, msg: 'La bolsa es requerida' })
        if (!body.products.length) return res.json({ ok: false, msg: 'La bolsa esta vacia' })
        if (body.products.some(e => JSON.stringify(e) === '{}')) return res.json({ ok: false, msg: 'Hay un item vacio en tu bolsa' })
        if (!body.address) return res.json({ ok: false, msg: 'Direccion es requerido' })
        if (Object.entries(body.address).length === 0) return res.json({ ok: false, msg: 'Direccion es requerido' })

        const user = await User.findById(body.userId)
        if (!user) return res.json({ ok: false, msg: 'El usuario no existe' })


        const { flag, msg, products:newProducts } = await validateProductsInOrder(body.products)
        // console.log("==== Products ======")
        // console.log(newProducts)


        if (flag === true) {

            const totalPrice = newProducts.reduce((acumulador, actual) => acumulador + actual.price, 0)
            const cantidad = newProducts.reduce((acumulador, actual) => acumulador + actual.quantity, 0)

            const saveOrder = {
                userId: body.userId,
                products: newProducts,
                amount: cantidad,
                totalPrice: totalPrice.toFixed(2),
                address: body.address
            }

            const newOrder = new Order(saveOrder)
            const savedProduct = await newOrder.save()
            res.status(201).json({
                ok: true,
                order: savedProduct
            })
        }
        else {
            res.json({ ok: false, msg: msg })
        }


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server',
            error: error.toString()
        })
    }
}



module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
}