const express = require("express")
const controller = require("../controllers/product")

const router = express.Router();


router.get('/products', controller.getAllProducts);
router.get("/products/:id", controller.getProductById);
router.post('/products', controller.createProduct);
router.put('/products/:id', controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);

module.exports = router;