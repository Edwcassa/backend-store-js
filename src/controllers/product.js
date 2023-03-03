const { capitaliceText } = require('../helpers/capitaliceText')
const { normalizeProduct } = require('../helpers/normalizeProduct')
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
    const {
        code, title, desc, img,
        categories, sizes, colors, price
    } = req.body

    if (!code) return res.json({ ok: false, msg: "Codigo es requerido" })
    if (!title) return res.json({ ok: false, msg: "Titulo es requerido" })
    if (!desc) return res.json({ ok: false, msg: "Descripcion es requerido" })
    if (!img) return res.json({ ok: false, msg: "Imagen es requerido" })
    if (!price) return res.json({ ok: false, msg: "Precio es requerido" })
    if (!categories || !categories.length) return res.json({ ok: false, msg: "Las categorias es requerido" })
    if (!sizes || !sizes.length) return res.json({ ok: false, msg: "Las tallas es requerido" })
    if (!colors || !colors.length) return res.json({ ok: false, msg: "Los colores es requerido" })
    if (colors.some(e => (e.colorName === undefined || e.colorName === ""))) return res.json({ ok: false, msg: "Los colores (nombre) es requerido" })
    if (colors.some(e => e.colorImages === undefined)) return res.json({ ok: false, msg: "Los colores (imagenes) es requerido" })
    if (colors.some(e => e.colorImages.length === 0)) return res.json({ ok: false, msg: "Los colores (imagenes) es requerido" })

    await normalizeProduct(req.body)

    console.log(req.body.price)
    // console.log(typeof(req.body.price))

    try {
        const codeExist = await Product.findOne({ 'code': req.body.code })
        if (codeExist) return res.json({ ok: false, msg: "Este codigo de item ya existe" })

        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(200).json({
            ok: true,
            product: savedProduct
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.toString()
        })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id
    const { body } = req

    try {
        if (body.code) return res.json({ ok: false, msg: "El codigo de un item no se puede actualizar" })
        if (body.title === "") return res.json({ ok: false, msg: "Titulo es requerido" })
        if (body.desc === "") return res.json({ ok: false, msg: "Descripcion es requerido" })
        if (body.img === "") return res.json({ ok: false, msg: "Imagen es requerido" })
        if (body.price === "") return res.json({ ok: false, msg: "Precio es requerido" })
        if (body.categories)
            if (!body.categories.length) return res.json({ ok: false, msg: "Las categorias es requerido" })
        if (body.sizes)
            if (!body.sizes.length) return res.json({ ok: false, msg: "Las tallas es requerido" })
        if (body.colors) {
            if (!body.colors.length) return res.json({ ok: false, msg: "Los colores es requerido" })
            if (body.colors.some(e => (e.colorName === undefined || e.colorName === ""))) return res.json({ ok: false, msg: "Los colores (nombre) es requerido" })
            if (body.colors.some(e => e.colorImages === undefined)) return res.json({ ok: false, msg: "Los colores (imagenes) es requerido" })
            if (body.colors.some(e => e.colorImages.length === 0)) return res.json({ ok: false, msg: "Los colores (imagenes) es requerido" })
        }
        
        await normalizeProduct(body)

        const existProduct = await Product.findByIdAndUpdate(id, { $set: body })
        if (!existProduct) return res.json({
            ok: false,
            msg: 'Producto no encontrado'
        })
        res.status(200).json({
            ok: true,
            msg: 'Se actualizo el producto',
            product: { ...existProduct._doc, ...body }
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
            msg: 'No encontrado'
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