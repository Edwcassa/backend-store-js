const capitaliceText = (text) => {
    text_low = text.toLowerCase()
    return text_low[0].toUpperCase() + text_low.substring(1);
}

module.exports = {
    capitaliceText
}