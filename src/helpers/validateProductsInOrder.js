const Product = require("../models/Product")
const { normalizeOrder } = require("./normalizeOrder")

const validateProductsInOrder = async (products) => {
    errors = 0
    var flag = false
    var msg = "Items no válidos"

    for (var i = 0; i < products.length; i++) {
        const theProd = products[i]

        if (!theProd.productId) {
            errors += 1
            msg = `Id de item es requerido - item ${i+1}`
            break
        }
        if (theProd.price || theProd.price === "") {
            errors += 1
            msg = `Precio no autorizado - item ${i+1}`
            break
        }
        if (!theProd.size) {
            errors += 1
            msg = `Talla es requerido - item ${i+1}`
            break
        }
        if (!theProd.colorName) {
            errors += 1
            msg = `Color es requerido - item ${i+1}`
            break
        }

        await normalizeOrder(theProd)

        const myProduct = await Product.findById(theProd.productId)

        if (!myProduct) {
            errors += 1
            msg = `Item ${i + 1} no encontrado`
            break;
        }


        const allSizes = myProduct.sizes
        const existSize = allSizes.includes(theProd.size)
        if (!existSize) {
            errors += 1
            msg = `Talla no encontrada (item ${i + 1})`
            break;
        }

        const allColors = myProduct.colors
        const existColor = allColors.some(e => e.colorName === theProd.colorName)
        if (!existColor) {
            errors += 1
            msg = `Color no encontrado (item ${i + 1})`
            break;
        }

        if (theProd.quantity || theProd.quantity === 0 || theProd.quantity === "") {
            // console.log(theProd.quantity)
            if (!Number.isInteger(theProd.quantity) || theProd.quantity <= 0 || theProd.quantity >= 3) {
                errors += 1
                msg = `Cantidad no válida (item ${i + 1}), (max 2 items)`
                break;
            }
        }
        else {
            theProd.quantity = 1
        }

        theProd.price = myProduct.price
        // console.log("update: ",theProd)
    }

    if (errors == 0) return { flag: true, msg: "Items válidos", products }
    else return { flag, msg, products: {} }
}

module.exports = {
    validateProductsInOrder
}