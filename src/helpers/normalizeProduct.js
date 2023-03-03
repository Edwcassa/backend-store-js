const { capitaliceText } = require("./capitaliceText")

const normalizeProduct = (body) => {

    if (body.code) {
        body.code = capitaliceText(body.code)
    }
    if (body.title) {
        body.title = capitaliceText(body.title)
    }
    if (body.desc) {
        body.desc = capitaliceText(body.desc)
    }
    if (body.categories) {
        body.categories = body.categories.map(e => capitaliceText(e))
    }
    if (body.sizes) {
        body.sizes = body.sizes.map(e => e.toUpperCase())
    }
    if (body.colors) {
        body.colors = body.colors.map(e => {
            e.colorName = capitaliceText(e.colorName)
            return e
        })
    }

    return body

}

module.exports = {
    normalizeProduct
}