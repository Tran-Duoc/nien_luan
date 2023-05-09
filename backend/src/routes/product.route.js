const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  filterProduct,
  getProducts,
  getProduct,
  updateProduct,
} = require("../controllers/product.controller");

const { verify_token } = require("../middlewares/jwt");
const upload = require("../utils/multer.util");

router.get("/all", verify_token, getProducts);

router.get("/item/:id", getProduct);

router.post("/create", upload.array("images", 5), verify_token, createProduct);
router.put(
  "/update/:id",
  upload.array("images", 5),
  verify_token,
  updateProduct
);

router.delete("/remove/:id", verify_token, deleteProduct);
router.delete("/filter", filterProduct);

module.exports = router;
