const addProductCart = (products, _id) => {
    const msg = ""
    const exist = products.some(e => e.productId.toString() === _id)
    if (!exist) {
        products.push({ productId: _id, quantity: 1 })
        msg = "Se agrego a la bolsa"
    } else {
        products.map(e => {
            if (e.productId.toString() === _id) e.quantity += 1;
            return e
        })
        msg: "Se aumento un item"
    }
    return products
}

module.exports = {
    addProductCart
}