const express = require("express");
const router = express.Router();
const { addProdcut ,updateProduct, deleteProduct,getProduct } = require("../controlles/ProductControlles");
const { authMiddleware, authorizeRoles } = require("../middleware/UserMiddleware");


router.get('/getallproduct',getProduct);

router.post('/postproduct',[authMiddleware,authorizeRoles('admin')],addProdcut);



router.put('/updateproduct/:id',[authMiddleware, authorizeRoles('admin')],updateProduct);
router.delete('/deleteproduct/:id',[authMiddleware, authorizeRoles('admin')],deleteProduct);
module.exports=router
