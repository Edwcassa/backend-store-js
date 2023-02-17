const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(200).json({
            ok: true,
            products: allProducts
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        if (!product) return res.json({
            ok: false,
            msg: 'No fue encontrado'
        })
        res.status(200).json({
            ok: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(200).json({
            ok: true,
            product: savedProduct
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id
    const upProduct = req.body
    try {
        const existProduct = await Product.findByIdAndUpdate(id, { $set: upProduct })
        if (!existProduct) return res.json({
            ok: false,
            msg: 'No se encuentra el producto'
        })
        res.status(200).json({
            ok: true,
            msg: 'A sido actualizado',
            product: { ...existProduct._doc, ...upProduct }
        })
    }

    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const existProduct = await Product.findByIdAndDelete(id)
        if (!existProduct) return res.json({
            ok: false,
            msg: 'No se encuentra el producto'
        })
        res.status(200).json({
            ok: true,
            msg: 'Se elimino el producto'
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
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}