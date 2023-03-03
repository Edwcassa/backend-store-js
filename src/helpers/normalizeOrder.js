const { capitaliceText } = require("./capitaliceText")

const normalizeOrder = (body) => {

    if (body.size) {
        body.size = body.size.toUpperCase()
    }
    if (body.colorName) {
        body.colorName = capitaliceText(body.colorName)
    }
    return body
}

module.exports = {
    normalizeOrder
}