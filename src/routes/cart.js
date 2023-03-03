const express = require("express")
const controller = require("../controllers/cart")

const router = express.Router();


router.get('/carts', controller.getAllCarts);
router.get("/carts/:id", controller.getCartById);
router.delete('/carts/:id', controller.deleteCart);

router.post('/carts/addItem', controller.addItemToCart);
router.put('/carts/updateItem/:id', controller.updateItemCart);
router.delete('/carts/deleteItem/:id', controller.deleteItemCart);

module.exports = router;