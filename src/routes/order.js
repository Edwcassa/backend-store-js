const express = require("express")
const controller = require("../controllers/order")

const router = express.Router();


router.get('/orders', controller.getAllOrders);
router.get("/orders/:id", controller.getOrderById);
router.post('/orders', controller.createOrder);

module.exports = router;