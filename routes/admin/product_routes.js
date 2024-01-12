const express = require('express');
const productRoute = express.Router();
const {
    createProduct,
    updateProduct,
    getAllProduct,
    specificProduct,
    deleteProduct
} = require('../../controller/admin/product_controller');
const { upload } = require('../../helpers/imageUploader');
const { tokenAdmin } = require('../../helpers/tokenAdmin');

productRoute.post('/add-product', tokenAdmin ,upload.single('productImage'),createProduct);
productRoute.put('/update-product', tokenAdmin , upload.single('productImage') , updateProduct);
productRoute.get('/getall-product', tokenAdmin , getAllProduct);
productRoute.get('/get-product', tokenAdmin , specificProduct);
productRoute.delete('/delete-product', tokenAdmin , deleteProduct);

module.exports = productRoute