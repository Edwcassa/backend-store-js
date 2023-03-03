const Cart = require('../models/Cart')
const User = require("../models/User")
const Product = require("../models/Product")

const ADD = require("../helpers/addProductCart")

const getAllCarts = async (req, res) => {
    try {
        const allCarts = await Cart.find()
        // .populate({
        //     path: 'products',
        //     populate: { path: 'productId' }
        // })
        res.status(200).json({
            ok: true,
            carts: allCarts
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const getCartById = async (req, res) => {
    const id = req.params.id
    try {
        const cart = await Cart.findById(id)

        if (!cart) return res.json({
            ok: false,
            msg: 'No fue encontrado'
        })
        res.status(200).json({
            ok: true,
            cart
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const deleteCart = async (req, res) => {
    const id = req.params.id
    try {
        const existCart = await Cart.findByIdAndDelete(id)
        if (!existCart) return res.json({
            ok: false,
            msg: 'No se encuentra el carro'
        })
        res.status(200).json({
            ok: true,
            msg: 'Se elimino el carro'
        })
    }

    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}


// METODOS ESPECIFICOS DEL CARRO

const addItemToCart = async (req, res) => {
    const { userId, productId } = req.body
    try {
        const usuario = await User.findById(userId)
        if (!usuario) return res.json({ ok: false, msg: 'No existe el usuario' })
        const product = await Product.findById(productId)
        if (!product) return res.json({ ok: false, msg: 'No existe el producto' })

        const allCarts = await Cart.find()
        const myCart = allCarts.filter(e => e.userId == userId)

        if (!myCart.length) { // comprobando si el arreglo esta vacio
            // console.log("no hay un usuario con carro")
            const obj = {
                userId,
                products: [{ productId }]
            }
            const newCart = new Cart(obj)
            const savedCart = await newCart.save()
            res.status(200).json({
                ok: true,
                msg: 'Se creo el carro',
                cart: savedCart
            })
        }

        else {
            // console.log("si hay un usuario con carro")
            const myCartId = myCart[0]._id
            const myProducts = myCart[0].products
            // console.log(myProducts)
            const newProducts = ADD.addProductCart(myProducts, productId)
            // console.log("---- actualizado add")
            // console.log(newProducts)

            const newCart = {
                myCartId,
                products: newProducts
            }

            const aa = await Cart.findByIdAndUpdate(myCartId, newCart)
            return res.json({ ok: true, msg: 'Se agrego un item' })
        }


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const updateItemCart = async (req, res) => {
    const id = req.params.id
    const { userId, productId, quantity } = req.body
    try {

        if (!quantity || quantity < 0) return res.json({ ok: false, msg: 'Cantidad invalida' })

        const usuario = await User.findById(userId)
        if (!usuario) return res.json({ ok: false, msg: 'No existe el usuario' })
        const product = await Product.findById(productId)
        if (!product) return res.json({ ok: false, msg: 'No existe el producto' })
        const myCart = await Cart.findById(id)
        if (!myCart) return res.json({ ok: false, msg: 'No existe su carro para actualizar' })
        if (myCart.userId.toString() !== userId) return res.json({ ok: false, msg: 'No le pertenece este carro' })

        const myCartId = myCart._id
        const myProducts = myCart.products

        const existProductInMyCart = myProducts.some(e => e.productId.toString() === productId)
        if (!existProductInMyCart) return res.json({ ok: false, msg: 'No existe este producto en su carro' })

        myProducts.map(e => {
            if (e.productId.toString() === productId) e.quantity = quantity
            return e
        })

        const upCart = {
            myCartId,
            products: myProducts
        }

        const bb = await Cart.findByIdAndUpdate(myCartId, upCart)
        return res.json({ ok: true, msg: 'Se actualizo el item' })

    }

    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const deleteItemCart = async (req, res) => {
    const id = req.params.id
    const { userId, productId } = req.body
    try {
        const carUser = await Cart.findById(id)
        if (!carUser) return res.json({ ok: false, msg: 'No existe el carro' })
        const usuario = await User.findById(userId)
        if (!usuario) return res.json({ ok: false, msg: 'No existe el usuario' })
        const product = await Product.findById(productId)
        if (!product) return res.json({ ok: false, msg: 'No existe el producto' })

        if (carUser.userId.toString() !== userId) return res.json({ ok: false, msg: 'No le pertenece este carro' })

        const myProducts = carUser.products

        const existProductInMyCart = myProducts.some(e => e.productId.toString() === productId)
        if (!existProductInMyCart) return res.json({ ok: false, msg: 'No existe este producto en su carro' })

        const oldProducts = carUser.products
        const products = oldProducts.filter(item => { item.productId !== productId });
        const cambios = {
            ...carUser._doc,
            products
        }

        const cartActualizado = await Cart.findByIdAndUpdate(id, cambios)

        res.status(200).json({
            ok: true,
            msg: 'Se elimino el item',
            cart: cambios
        })
    }

    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}



module.exports = {
    getAllCarts,
    getCartById,
    deleteCart,

    addItemToCart,
    updateItemCart,
    deleteItemCart
}